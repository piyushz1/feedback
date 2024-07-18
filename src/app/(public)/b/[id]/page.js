"use client";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import LeftCardForm from "../../../../views/public/b/LeftCardForm";
import FeedbackList from "../../../../views/public/b/FeedbackList";
import { Typography } from "@mui/material";
import axios from "axios";
import {
  RedirectToSignIn,
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Board = ({ params }) => {
  const [board, setBoard] = useState(null);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (params?.id) getBoard(params?.id);
  }, [params]);

  const getBoard = async (id) => {
    const res = await axios({
      url: "/api/getBoardById",
      params: { boardId: id },
      method: "GET",
    });
    setBoard(res?.data);
  };

  return (
    <Box mx={"auto"} maxWidth={1000}>
      <Box
        py={3}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={26} fontWeight={700}>
          {board?.title}
        </Typography>
        <SignedIn>
          <UserButton afterSignOutUrl={`/b/${params?.id}`} />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" fallbackRedirectUrl={`b/${params?.id}`} />
        </SignedOut>
      </Box>

      <Box display={"flex"} gap={3}>
        <LeftCardForm params={params} reload={reload} setReload={setReload} />
        <FeedbackList params={params} reload={reload} />
      </Box>
    </Box>
  );
};

export default Board;
