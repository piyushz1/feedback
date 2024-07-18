import { useAuth, useClerk } from "@clerk/nextjs";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LeftCardForm = ({ params, reload, setReload }) => {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [loader, setLoader] = useState(false);
  const auth = useAuth();

  const clerk = useClerk();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = async () => {
    if (auth?.isSignedIn) {
      if (title && desc) {
        setLoader(true);
        try {
          const data = { title: title, description: desc };

          await axios({
            data: data,
            method: "POST",
            url: `/api/feedback`,
            params: { boardId: params?.id },
          });
          setReload(!reload);
          setTitle(null);
          setDesc(null);
          setLoader(false);
        } catch (error) {
          setLoader(false);
          if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
          }
        }
      }
    } else {
      clerk.openSignIn();
    }
  };
  return (
    <Box
      maxWidth={300}
      height={220}
      width={"100%"}
      bgcolor={"white"}
      p={3}
      borderRadius={2}
    >
      <form style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextField
          fullWidth
          value={title || ""}
          onChange={handleTitle}
          label="title"
        />
        <TextField
          fullWidth
          value={desc || ""}
          onChange={handleDesc}
          label="Description"
        />

        <Button
          fullWidth
          disabled={loader}
          variant="contained"
          onClick={handleSubmit}
        >
          {loader ? (
            <CircularProgress
              sx={{ color: "black", opacity: 0.3, mr: 0.5 }}
              size={11}
              thickness={6}
            />
          ) : null}
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export default LeftCardForm;
