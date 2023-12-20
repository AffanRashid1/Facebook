import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImagePreview = ({ image, onClick }) => {
  if (!image) return;
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <IconButton
          sx={{
            position: "relative",
            top: "50px",
            right: { md: "-85%", sm: "-80%", xs: "-80%" },
            bgcolor: "background.paper",
          }}
          // onClick={onCloseIcon}
          onClick={onClick}
        >
          <CloseIcon />
        </IconButton>
        <img
          src={image}
          alt="image-preview"
          style={{
            width: "100%",
            borderRadius: "10px",
          }}
        />
      </Box>
    </>
  );
};

export default ImagePreview;
