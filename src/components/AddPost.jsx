import React, { useEffect } from "react";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CollectionsIcon from "@mui/icons-material/Collections";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import styled from "@emotion/styled";
import { useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GifBoxIcon from "@mui/icons-material/GifBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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

const AddPost = ({ post, feedPosts, isProfile }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.appReducer.user);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setimgUrl] = useState(null);
  const [loadingBtn, setloadingBtn] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();
    if (caption === "" && file === null) {
      toast.error("Must Fill The Field");
      setCaption("");
      setimgUrl(null);
      setFile(null);
    } else if (file && file.type && !file.type.startsWith("image/")) {
      setCaption("");
      setimgUrl(null);
      toast.error("Please select a valid image file");
    } else {
      try {
        setloadingBtn(true);

        let formData = new FormData();
        formData.append("imageUrl", file);
        formData.append("caption", caption);

        let res = await apiManager({
          method: "post",
          path: `/posts/create-post`,
          params: formData,
          header: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(file);
        isProfile ? post() : feedPosts();
        setCaption("");
        setFile(null);
        setOpen(false);
        setimgUrl(null);
        toast.success(res?.data?.message);
      } catch (error) {
        setCaption("");
        setFile(null);
        setimgUrl(null);
        setOpen(false);
        toast.error(error?.message);
      } finally {
        setloadingBtn(false);
      }
    }
  };

  useEffect(() => {
    if (file) {
      setimgUrl(URL.createObjectURL(file));
    }
  }, [file]);

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
                    fontSize: { sm: "13px", lg: "16px" },
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
                    fontSize: { sm: "13px", lg: "16px" },
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
                    fontSize: { sm: "13px", lg: "16px" },
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
          onClose={(e) => {
            setOpen(false);
            setCaption("");
            setimgUrl(null);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableAutoFocus={true}
        >
          <Box
            sx={{
              width: "40vw",
              bgcolor: "background.paper",
              padding: "0 20px",
              outline: "none",
            }}
            bgcolor={"background.default"}
            color={"text.primary"}
            borderRadius={5}
          >
            <Box
              sx={{
                position: "sticky",
                top: "0",
                bgcolor: "background.paper",
                zIndex: "4",
                padding: "10px 0",
              }}
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
            </Box>
            <Box
              sx={{
                overflowY: "scroll",
                maxHeight: "45vh",
                overflowX: "hidden",
              }}
            >
              <TextField
                id="standard-multiline-static"
                multiline
                rows={3}
                placeholder="What's on your mind?"
                sx={{ width: "100%", margin: "10px 0" }}
                variant="standard"
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                autoFocus
              />
              {imgUrl !== null ? (
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "relative",
                      top: "50px",
                      right: "-90%",
                      bgcolor: "background.paper",
                    }}
                    onClick={() => {
                      setimgUrl(null);
                      setFile(null);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <img
                    src={imgUrl}
                    alt=""
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              ) : (
                ""
              )}
            </Box>
            <Box
              sx={{
                position: "sticky",
                bottom: "0px",
                bgcolor: "background.paper",
                paddingBottom: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0",
                }}
              >
                <IconButton component="label" variant="contained">
                  <CollectionsIcon
                    sx={{ color: "#58C472", fontSize: "25px" }}
                  />
                  <VisuallyHiddenInput
                    type="file"
                    filename={file}
                    onChange={(e) => setFile(e.target.files[0])}
                    // accept="image/*"
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

              <LoadingButton
                loading={loadingBtn}
                variant="contained"
                fullWidth
                onClick={createPost}
              >
                Post
              </LoadingButton>
            </Box>
          </Box>
        </StyledModal>
      </form>
    </>
  );
};
export default AddPost;
