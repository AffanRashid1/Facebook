import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        color: "white",
        height: "100vh",
      }}
    >
      <Box>
        <Typography fontSize="120px" textAlign="center">
          404
        </Typography>
        <Typography fontSize="20px" textAlign="center">
          Page Not Found
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
