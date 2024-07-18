import { Box, Link, Typography } from "@mui/material";
// import Link from "next/link";
import React from "react";

const BoardsList = ({ data }) => {
  return (
    <Box mt={2} display={"flex"} flexDirection={"column"} gap={3}>
      {data?.map((item) => (
        <Link
          href={`/dashboard/${item.id}`}
          underline="none"
          key={item.id}
          px={3}
          py={2.5}
          borderRadius={2}
          bgcolor={"white"}
          minWidth={360}
          width={"100%"}
          sx={{
            cursor: "pointer",
            ":hover": {
              transform: "scale(1.02)",
              transition: "transform",
              transitionDuration: 2000,
            },
          }}
        >
          <Typography
            color={"black"}
            fontSize={20}
            fontWeight={600}
            textTransform={"capitalize"}
          >
            {item?.title}
          </Typography>
        </Link>
      ))}
    </Box>
  );
};

export default BoardsList;
