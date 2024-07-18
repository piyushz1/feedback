"use client";
import { useUser } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { Button, IconButton, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

const LeftCard = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [isCopied, setIsCopied] = useState(false);
  const textAreaRef = useRef(null);

  const handleCopy = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(window.location.origin + `/b/${params?.id}`);

    // Alert the copied text
    alert("Copied the text: " + window.location.origin + `/b/${params?.id}`);
  };

  const handleDeleteBoard = async (id) => {
    const res = await axios({
      method: "DELETE",
      url: `/api/board`,
      params: { boardId: id },
    });
    router.push("/dashboard");
  };

  return (
    <Box borderRadius={2} p={3} height={200} bgcolor={"white"} borderRight={2}>
      <Typography fontWeight={700} color={"white"}>
        Build features users really want
      </Typography>
      <Box>
        <Typography color={"black"}>Public link</Typography>
        <textarea
          ref={textAreaRef}
          value={window.location.origin + `/b/${params?.id}`}
          style={{ display: "none" }}
        />
        <Box
          display={"flex"}
          gap={2}
          justifyContent={"space-between"}
          color={"white"}
          bgcolor={"gray"}
          p={1}
          borderRadius={1.5}
        >
          <Typography
            component={"button"}
            border={"none"}
            sx={{
              cursor: "pointer",
              bgcolor: "transparent",
            }}
            onClick={handleCopy}
          >
            {window.location.origin + `/b/${params?.id}`}
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Link
              href={window.location.origin + `/b/${params?.id}`}
              target="_blank"
              sx={{ p: "6px", pt: "7px", pb: 0, cursor: "pointer" }}
              bgcolor={"white"}
              borderRadius={2}
              width={30}
              height={30}
            >
              <Icon
                icon="fluent:arrow-up-right-32-filled"
                fontSize={16}
                style={{ color: "black" }}
              />
            </Link>
            <IconButton
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                p: "6px !important",
                width: 30,
                height: 30,
                ":hover": {
                  bgcolor: "white",
                },
              }}
              width={30}
              height={30}
              onClick={handleCopy}
            >
              <Icon
                icon="prime:copy"
                fontSize={20}
                style={{ color: "black" }}
              />
            </IconButton>
          </Box>
        </Box>
        <Button
          variant="outlined"
          color="error"
          sx={{ p: 1, mt: 2, ml: "auto", flex: 1 }}
          onClick={() => handleDeleteBoard(params?.id)}
        >
          <Icon
            icon="gravity-ui:trash-bin"
            fontSize="1rem"
            style={{ color: "#FF3800" }}
          />
          <Typography textTransform="capitalize" pl={0.5}>
            Delete
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default LeftCard;
