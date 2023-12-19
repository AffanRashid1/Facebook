import { Box, LinearProgress } from "@mui/material";
import React from "react";

const LinearProgressBar = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            width: "100%",
          }}
        >
          <LinearProgress />
        </Box>
      )}
    </>
  );
};

export default LinearProgressBar;
