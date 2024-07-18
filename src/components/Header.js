import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user } = useUser();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={5}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Image src={"/logo.svg"} width={30} height={30} alt="logo" />
        <Typography fontWeight={700} fontSize={22}>
          Feedback
        </Typography>
      </Link>
      <SignedOut>
        <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" />
      </SignedOut>
      <SignedIn>
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Image
            src={user?.imageUrl}
            width={30}
            height={30}
            alt={user?.fullName}
            style={{ borderRadius: 20 }}
          />
          <Typography>Dashboard</Typography>
        </Link>
      </SignedIn>
    </Box>
  );
};

export default Header;
