import React from "react";
import { ButtonBase, Stack, Typography } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CollectionsIcon from "@mui/icons-material/Collections";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const CreatePostIcons = ({ setOpen }) => {
  return (
    <>
      <Stack
        sx={{
          maxWidth: "100%",
          margin: "7px 0",
        }}
        justifyContent="space-around"
        direction="row"
      >
        <ButtonBase
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          onClick={(e) => setOpen(true)}
        >
          <VideoCallIcon sx={{ color: "#F23E5C", fontSize: "30px" }} />
          <Typography
            variant="small"
            sx={{
              fontSize: { sm: "13px", lg: "16px" },
              marginLeft: "8px",
              display: { xs: "none", sm: "flex" },
            }}
          >
            Live video
          </Typography>
        </ButtonBase>
        <ButtonBase
          aria-label="share"
          sx={{ display: "flex", alignItems: "center" }}
          onClick={(e) => setOpen(true)}
        >
          <CollectionsIcon sx={{ color: "#58C472", fontSize: "25px" }} />
          <Typography
            variant="small"
            sx={{
              fontSize: { sm: "13px", lg: "16px" },
              marginLeft: "8px",
              display: { xs: "none", sm: "flex" },
            }}
          >
            Photo/video
          </Typography>
        </ButtonBase>

        <ButtonBase
          aria-label="share"
          sx={{ display: "flex", alignItems: "center" }}
          onClick={(e) => setOpen(true)}
        >
          <TagFacesIcon sx={{ color: "#F5BE3E", fontSize: "25px" }} />
          <Typography
            variant="small"
            sx={{
              fontSize: { sm: "13px", lg: "16px" },
              marginLeft: "8px",
              display: { xs: "none", sm: "flex" },
            }}
          >
            Feeling/activity
          </Typography>
        </ButtonBase>
      </Stack>
    </>
  );
};

export default CreatePostIcons;
