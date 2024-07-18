"use client";
import { Box } from "@mui/material";
import BackButton from "../../../../components/BackButton";
import LeftCard from "../../../../views/board/LeftCard";
import RightCard from "../../../../views/board/RightCard";
import {
  Protect,
  RedirectToSignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const page = ({ params }) => {
  return (
    <Protect fallback={<RedirectToSignIn redirectUrl="/dashboard" />}>
      <Box mx={"auto"} maxWidth={1305} p={2}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box width={100}>
            <BackButton />
          </Box>
          <SignedIn>
            <UserButton afterSignOutUrl={`/`} />
          </SignedIn>
        </Box>
        <Box mt={5} display={"flex"} gap={3}>
          <LeftCard params={params} />
          <RightCard params={params} />
        </Box>
      </Box>{" "}
    </Protect>
  );
};

export default page;
