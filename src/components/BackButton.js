"use client";
import { Link, Typography } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";

const BackButton = () => {
  return (
    <Link
      href="/dashboard"
      bgcolor={"white"}
      underline="none"
      px={2}
      py={1.5}
      borderRadius={2}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={0.5}
    >
      <Icon
        icon="tabler:arrow-back-up"
        color="black"
        width={24}
        fontSize="1.375rem"
      />
      <Typography color="black" fontSize={16} fontWeight={600}>
        Back
      </Typography>
    </Link>
  );
};

export default BackButton;
