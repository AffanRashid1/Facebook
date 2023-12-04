import React from "react";
import {
  Avatar,
  Box,
  Card,
  InputBase,
  Divider,
  IconButton,
  Typography,
  Modal,
  TextField,
  Stack,
  ButtonGroup,
  Button,
  Input,
} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CollectionsIcon from "@mui/icons-material/Collections";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import avatar from "../assets/avatar.jpg";
import styled from "@emotion/styled";
import { useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GifBoxIcon from "@mui/icons-material/GifBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { FileTypeIcon } from "@mui/icons-material";
import apiManager from "../Helper/ApiManager";

const addInputStyle = {
  display: "flex",
  alignItems: "center",
  margin: "auto",
  marginBottom: "15px",
  borderRadius: "25px",
  width: "80%",
  backgroundColor: "action.selected",
};

// custom modal
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// userBox to display in mobile devices
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
}));
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPost = ({ post, feedPosts }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.appReducer.user);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const createPost = async (e) => {
    e.preventDefault();

    if (caption === "" && file === null) {
      toast.error("Must Fill The Field");
    } else {
      try {
        let formData = new FormData();
        formData.append("imageUrl", file);
        formData.append("caption", caption);

        let res = await axios.post(
          `${process.env.REACT_APP_API_KEY}/posts/create-post`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        feedPosts();
        // post();
        setCaption("");
        setOpen(false);
        console.log(file);
        console.log(res?.imageUrl);
        toast.success("Added Succesfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form>
        <Box mb={3}>
          <Card pb={5} pt={5} sx={{ padding: "10px 0", borderRadius: "10px" }}>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems="center"
              justifyContent="center"
              mb={2}
              mt={2}
            >
              <Avatar
                src={user?.profile_photo}
                sx={{ width: "45px", height: "45px", marginRight: "15px" }}
              />
              <Box sx={addInputStyle}>
                <InputBase
                  placeholder={`Whats on your mind ${user?.name}`}
                  fullWidth
                  sx={{
                    padding: "5px 10px",
                  }}
                  readOnly
                  onClick={(e) => setOpen(true)}
                />
              </Box>
            </Stack>
            <Divider variant="middle" />
            <Box
              sx={{
                maxWidth: "100%",
                display: "flex",
                justifyContent: "space-around",
                margin: "7px 0",
              }}
            >
              <IconButton
                aria-label="share"
                sx={{ display: "flex", alignItems: "center" }}
                onClick={(e) => setOpen(true)}
              >
                <VideoCallIcon sx={{ color: "#F23E5C", fontSize: "30px" }} />
                <Typography
                  variant="small"
                  sx={{
                    fontSize: "16px",
                    marginLeft: "8px",
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  Live video
                </Typography>
              </IconButton>
              <IconButton
                aria-label="share"
                sx={{ display: "flex", alignItems: "center" }}
                onClick={(e) => setOpen(true)}
              >
                <CollectionsIcon sx={{ color: "#58C472", fontSize: "25px" }} />
                <Typography
                  variant="small"
                  sx={{
                    fontSize: "16px",
                    marginLeft: "8px",
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  Photo/video
                </Typography>
              </IconButton>

              <IconButton
                aria-label="share"
                sx={{ display: "flex", alignItems: "center" }}
                onClick={(e) => setOpen(true)}
              >
                <TagFacesIcon sx={{ color: "#F5BE3E", fontSize: "25px" }} />
                <Typography
                  variant="small"
                  sx={{
                    fontSize: "16px",
                    marginLeft: "8px",
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  Feeling/activity
                </Typography>
              </IconButton>
            </Box>
          </Card>
        </Box>
        {/* add post modal */}
        <StyledModal
          open={open}
          onClose={(e) => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableAutoFocus={true}
        >
          <Box
            sx={{
              width: { sm: 400, xs: "60vw" },
              bgcolor: "background.paper",
            }}
            bgcolor={"background.default"}
            color={"text.primary"}
            borderRadius={5}
            p={5}
          >
            <CloseIcon
              sx={{
                color: "black",
                textAlign: "end",
                width: "100%",
                marginLeft: "45%",
                color: "gray",
              }}
              onClick={(e) => setOpen(false)}
            />

            <Typography variant="h6" color="gray" textAlign={"center"}>
              Create post
            </Typography>
            <UserBox>
              <Avatar
                sx={{ width: "35px", height: "35px" }}
                src={user?.profile_photo}
                onClick={(e) => setOpen(true)}
              ></Avatar>
              <Typography
                variant="span"
                fontWeight={500}
                textTransform="capitalize"
              >
                {user?.name}
              </Typography>
            </UserBox>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={3}
              placeholder="What's on your mind?"
              sx={{ width: "100%" }}
              variant="standard"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              autoFocus
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "15px 0",
              }}
            >
              <IconButton component="label" variant="contained">
                <CollectionsIcon sx={{ color: "#58C472", fontSize: "25px" }} />
                <VisuallyHiddenInput
                  type="file"
                  filename={file}
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/*"
                  multiple
                />
              </IconButton>
              <IconButton>
                <PersonAddAltIcon color="primary" />
              </IconButton>
              <IconButton>
                <GifBoxIcon color="primary" />
              </IconButton>
              <IconButton>
                <MoreHorizIcon color="error" />
              </IconButton>
              {/* <TagFacesIcon color="success" /> */}
              {/* <LocationOnIcon color="error" /> */}
            </Box>
            <Box sx={{ margin: "10px 0", width: "100%" }}>
              {/* <input
                type="file"
                // disableUnderline
                // fullWidth
                filename={file}
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                multiple
              /> */}
            </Box>
            <Button
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
              sx={{ margin: "5px 0" }}
              onClick={createPost}
            >
              Post
            </Button>
          </Box>
        </StyledModal>
      </form>
    </>
  );
};
export default AddPost;
