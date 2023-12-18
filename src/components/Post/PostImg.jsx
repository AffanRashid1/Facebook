import { Box, CardMedia, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";

const PostImg = ({ img }) => {
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    const imageObj = new Image();
    imageObj.src = img[0]?.url;

    imageObj.onload = () => {
      setImgLoading(false);
    };
  }, [img[0]?.url]);

  return (
    <>
      {imgLoading ? (
        <Skeleton variant="rectangular" height={600} animation="wave" />
      ) : (
        <Box
          sx={{
            maxHeight: "600px",
            background: `url(${img[0]?.url})`,
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
            image={img[0]?.url}
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
