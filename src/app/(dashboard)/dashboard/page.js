"use client";
import RightSection from "../../../components/RightSection";
import LeftCard from "../../../components/LeftCard";
import {
  Protect,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Box } from "@mui/material";
import React, { useState } from "react";

const Dashboard = () => {
  const [reload, setReload] = useState(false);
  const { isLoaded } = useUser();
  return (
    <Protect fallback={<RedirectToSignIn redirectUrl="/dashboard" />}>
      <Box maxWidth={1000} mx={"auto"} p={4}>
        {isLoaded ? (
          <Box ml={"auto"} width={30}>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        ) : (
          <Box
            width={30}
            height={30}
            ml={"auto"}
            borderRadius={20}
            bgcolor={"white"}
          />
        )}
        <Box display={"flex"} gap={3} py={5}>
          <LeftCard reload={reload} setReload={setReload} />
          <RightSection reload={reload} />
        </Box>
      </Box>
    </Protect>
  );
};

export default Dashboard;
