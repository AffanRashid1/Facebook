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

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F0F0F0",
  margin: "auto",
  marginBottom: "15px",
  borderRadius: "25px",
  width: "80%",
}));

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

const AddPost = ({ post }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.appReducer.user);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState();

  const createPost = async (e) => {
    e.preventDefault();

    if (caption == "") {
      toast.error("Must Fill The Field");
    } else {
      try {
        let formData = new FormData();
        formData.append("imageUrl", file);
        formData.append("caption", caption);

        axios.defaults.withCredentials = true;
        let res = await axios.post(
          `${process.env.REACT_APP_API_KEY}/posts/create-post`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setCaption("");
        setOpen(false);
        post();
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
          <Card pb={5} pt={5} sx={{ padding: "10px 0" }}>
            <Search>
              <Avatar
                src={user.profile_photo}
                sx={{ width: "45px", height: "45px", marginRight: "15px" }}
              ></Avatar>
              <InputBase
                placeholder={`Whats on your mind ${user?.name}`}
                sx={{
                  width: { xs: "50%", md: "100%", userSelect: "none" },
                  color: "black",
                }}
                readOnly
                onClick={(e) => setOpen(true)}
              />
            </Search>
            <Divider variant="middle" />
            <Box
              sx={{
                maxWidth: "100%",
                display: "flex",
                justifyContent: "space-around",
                margin: "10px 0",
              }}
            >
              <IconButton
                aria-label="share"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <VideoCallIcon sx={{ color: "red", fontSize: "30px" }} />
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
              >
                <CollectionsIcon sx={{ color: "green", fontSize: "25px" }} />
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
              >
                <TagFacesIcon sx={{ color: "red", fontSize: "25px" }} />
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
              <IconButton>
                <CollectionsIcon color="success" />
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
              <input
                type="file"
                // disableUnderline
                // fullWidth
                filename={file}
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                multiple
              />
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
