import { Box, CardMedia, Skeleton } from "@mui/material";
import React from "react";

const PostImg = ({ img, imgLoading }) => {
  return (
    <>
      {img?.length === 0 ? null : imgLoading ? (
        <Skeleton variant="rectangular" height={600} animation="wave" />
      ) : (
        <Box
          sx={{
            maxHeight: "600px",
            background: `url(${img})`,
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(30px)",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></Box>

          <CardMedia
            component="img"
            image={img}
            alt="Post"
            sx={{
              maxHeight: "600px",
              width: "auto",
              margin: "auto",
              position: "relative",
              zIndex: 1,
            }}
          />
        </Box>
      )}
    </>
  );
};

export default PostImg;
