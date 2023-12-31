import { Box, CardMedia, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";

const PostImg = ({ img }) => {
  const [imgLoading, setImgLoading] = useState(true);

  const styles = {
    backgroundBox: {
      maxHeight: "600px",
      background: `url(${img[0]?.url})`,
      backgroundSize: "cover",
      position: "relative",
    },
    picBox: {
      backdropFilter: "blur(30px)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    cardMedia: {
      maxHeight: "600px",
      width: "auto",
      margin: "auto",
      position: "relative",
      zIndex: 1,
    },
  };

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
        <Box sx={styles?.backgroundBox}>
          <Box sx={styles?.picBox}></Box>

          <CardMedia
            component="img"
            image={img[0]?.url}
            alt="Post"
            sx={styles?.cardMedia}
          />
        </Box>
      )}
    </>
  );
};

export default PostImg;
