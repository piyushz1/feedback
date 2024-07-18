import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoardsList from "./BoardsList";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const RightSection = ({ reload }) => {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    GetBoards();
  }, [reload]);

  const GetBoards = async () => {
    setIsLoaded(false);
    const res = await axios.get("/api/get-board");

    setData(res?.data);
    setIsLoaded(true);
  };

  return (
    <Box>
      <Typography fontWeight={700} fontSize={20}>
        {isLoaded ? data?.length : 0} Boards
      </Typography>
      {isLoaded ? (
        <BoardsList data={data} />
      ) : (
        <>
          <Skeleton
            width={300}
            height={70}
            sx={{ backgroundColor: "#f2f2f2", transform: "none", my: 2 }}
          />
          <Skeleton
            width={300}
            height={70}
            sx={{ backgroundColor: "#f2f2f2", transform: "none", mb: 2 }}
          />
          <Skeleton
            width={300}
            height={70}
            sx={{ backgroundColor: "#f2f2f2", transform: "none" }}
          />
        </>
      )}
    </Box>
  );
};

export default RightSection;
