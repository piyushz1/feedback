"use client";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createBoard } from "../action";

const LeftCard = ({ reload, setReload }) => {
  return (
    <Box bgcolor={"white"} borderRadius={2} p={3} maxHeight={260}>
      <Typography fontWeight={700} color={"black"}>
        Build features users really want
      </Typography>
      <form action={createBoard}>
        <FormControl fullWidth sx={{ my: 3, mt: 6 }}>
          <TextField label="Board Name" name="boardName" />
        </FormControl>
        <Button
          type="submit"
          onClick={() => setReload(!reload)}
          fullWidth
          variant="contained"
        >
          Create Board
        </Button>
      </form>
    </Box>
  );
};

export default LeftCard;
