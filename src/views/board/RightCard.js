import { Icon } from "@iconify/react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const RightCard = ({ params }) => {
  const [feedBacks, setFeedbacks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params?.id) {
      getFeedbacks(params?.id);
    }
  }, [params]);

  const getFeedbacks = async (id) => {
    setIsLoading(true);
    const res = await axios({
      method: "GET",
      url: `/api/feedback`,
      params: { boardId: id },
    });

    setIsLoading(false);
    setFeedbacks(res.data);
  };

  const handleDeleteFeedback = async (id) => {
    const res = await axios({
      method: "DELETE",
      url: `/api/feedback`,
      params: { feedBackId: id },
    });

    getFeedbacks(params?.id);
  };

  return (
    <Box display={"flex"} flex={1} flexDirection={"column"} gap={3}>
      {!isLoading ? (
        feedBacks?.length > 0 ? (
          feedBacks?.map((feedBack) => (
            <Box
              key={feedBack?.id}
              px={3}
              py={2.5}
              borderRadius={2}
              bgcolor={"white"}
              minWidth={640}
              width={"100%"}
            >
              <Box mb={1}>
                <Typography color={"black"} fontSize={20} fontWeight={700}>
                  {feedBack?.title}
                </Typography>
                <Typography color={"black"} fontSize={16} fontWeight={400}>
                  {feedBack?.description}
                </Typography>
              </Box>

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} alignItems={"flex-start"}>
                  <Icon
                    icon="iconamoon:arrow-up-2"
                    fontSize="1.6rem"
                    style={{ color: "black", paddingBottom: 4 }}
                  />
                  <Typography color={"black"} fontSize={16} fontWeight={600}>
                    {feedBack?.totalUpvote || 0}
                  </Typography>
                </Box>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => handleDeleteFeedback(feedBack?.id)}
                >
                  <Icon
                    icon="gravity-ui:trash-bin"
                    fontSize="1.2rem"
                    style={{ color: "#FF3800" }}
                  />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography fontWeight={600} textAlign={"center"}>
            No Feedback Yet
          </Typography>
        )
      ) : (
        <Box mt={4} textAlign={"center"}>
          <CircularProgress size={30} thickness={6} />
        </Box>
      )}
    </Box>
  );
};

export default RightCard;
