import React from "react";
import { Box, LinearProgress } from "@mui/material";

const LinearProgressBar = ({ isLoading }) => {
  if (!isLoading) return;
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          width: "100%",
        }}
      >
        <LinearProgress />
      </Box>
    </>
  );
};

export default LinearProgressBar;
