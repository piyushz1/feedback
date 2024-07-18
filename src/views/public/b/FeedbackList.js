import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FeedbackList = ({ params, reload }) => {
  const [feedBacks, setFeedbacks] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const clerk = useClerk();

  useEffect(() => {
    if (params?.id) {
      getFeedbacks(params?.id);
    }
  }, [params, reload]);

  const getFeedbacks = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: `/api/feedback`,
        params: { boardId: id },
      });
      console.log("res: ", res);
      setFeedbacks(res.data);
    } catch (error) {
      console.log("error: ", error);
      if (error?.message) {
        toast.error(error?.message);
      }
    }
  };

  const handleUpvote = async (feedbackId, upvotedByCurrentUser) => {
    if (auth?.isSignedIn) {
      setIsLoading(feedbackId);
      try {
        const res = await axios({
          method: "POST",
          url: `/api/upvote`,
          params: { feedbackId: feedbackId },
        });

        //   const res = await axios.post(`/api/upvote/${feedbackId}`);

        // Update the local state to reflect the upvote status change
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.map((feedBack) =>
            feedBack.id === feedbackId
              ? {
                  ...feedBack,
                  upvotedByCurrentUser: !upvotedByCurrentUser,
                  totalUpvote: upvotedByCurrentUser
                    ? feedBack.totalUpvote - 1
                    : feedBack.totalUpvote + 1,
                }
              : feedBack
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.log("error: ", error);
        getFeedbacks(params?.id);
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    } else {
      clerk?.openSignIn({
        afterSignOutUrl: `b/${params?.id}`,
        fallbackRedirectUrl: `b/${params?.id}`,
      });
    }
  };

  return (
    <Box display={"flex"} flex={1} flexDirection={"column"} gap={2}>
      {feedBacks?.length > 0 ? (
        feedBacks?.map((feedBack) => (
          <Box
            key={feedBack?.id}
            px={3}
            py={2.5}
            borderRadius={2}
            bgcolor={"white"}
            minWidth={640}
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            sx={{
              cursor: "pointer",
            }}
          >
            <Box>
              <Typography color={"black"} fontSize={20} fontWeight={700}>
                {feedBack?.title}
              </Typography>
              <Typography color={"black"} fontSize={16} fontWeight={400}>
                {feedBack?.description}
              </Typography>
            </Box>
            <Button
              variant={feedBack.upvotedByCurrentUser ? "contained" : "outlined"}
              onClick={() =>
                handleUpvote(feedBack.id, feedBack.upvotedByCurrentUser)
              }
              onMouseEnter={() => setIsHovered(feedBack.id)}
              onMouseLeave={() => setIsHovered(null)}
              sx={{
                display: "flex",
                flexDirection: "column",
                px: 0,
                minWidth: 50,
                borderRadius: 4,
                minHeight: 60,
              }}
            >
              <Icon
                icon="iconamoon:arrow-up-2"
                fontSize="1.4rem"
                style={{
                  transform:
                    feedBack.id === isHovered
                      ? feedBack.upvotedByCurrentUser
                        ? "translateY(2px)"
                        : "translateY(-2px)"
                      : "translateY(0)",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
              {isLoading == feedBack.id ? (
                <CircularProgress
                  size={12}
                  thickness={7}
                  sx={{
                    color: feedBack.upvotedByCurrentUser ? "white" : "grey",
                    fontWeight: "bold",
                  }}
                />
              ) : (
                `${feedBack?.totalUpvote || 0}`
              )}
            </Button>
          </Box>
        ))
      ) : (
        <Typography color={"white"} fontWeight={600} textAlign={"center"}>
          There No Feedback
        </Typography>
      )}
    </Box>
  );
};

export default FeedbackList;
