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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CollectionsIcon from "@mui/icons-material/Collections";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GifBoxIcon from "@mui/icons-material/GifBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiManager from "../../helper/apiManager";
import {
  addInputStyle,
  VisuallyHiddenInput,
  UserBox,
  StyledModal,
} from "./postStyles";

const AddPost = ({ post, feedPosts, isProfile }) => {
  const [open, setOpen] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const user = useSelector((state) => state.appReducer.user);

  const [formData, setFormData] = useState({
    file: null,
    caption: "",
    imgUrl: null,
  });

  const initialFormData = {
    file: null,
    caption: "",
    imgUrl: null,
  };

  const validateFormData = () => {
    if (!formData.file && !formData.caption.trim()) {
      toast.error("Please select a file or enter a caption");
      return false;
    }

    if (formData.caption.length >= 149) {
      toast.error("Text minimum 150 characters");
      return false;
    }

    if (formData.file) {
      const allowedExtensions = ["jpg", "jpeg", "png", "gif", "svg"];
      const fileExtension = formData.file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Please select a valid image");
        return false;
      }
    }

    return true;
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      if (!validateFormData()) {
        return;
      }
      setLoadingBtn(true);

      let data = new FormData();
      data.append("imageUrl", formData.file);
      data.append("caption", formData.caption);

      let res = await apiManager({
        method: "post",
        path: `/posts/create-post`,
        params: data,
        header: {
          "Content-Type": "multipart/form-data",
        },
      });

      isProfile ? post() : feedPosts();
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setOpen(false);
      setFormData(initialFormData);
      setLoadingBtn(false);
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
                src={user?.profile_photo[user?.profile_photo.length - 1]}
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
            setFormData(initialFormData);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableAutoFocus={true}
        >
          <Box
            sx={{
              width: { xs: "60vw", sm: "60vw", md: "30vw" },
              bgcolor: "background.paper",
              padding: "0 20px",
              outline: "none",
            }}
            bgcolor={"background.default"}
            color={"text.primary"}
            borderRadius={2}
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
                onClick={(e) => {
                  setOpen(false);
                  setFormData(initialFormData);
                }}
              />

              <Typography
                variant="h6"
                color="gray"
                textAlign={"center"}
                margin="10px 0"
              >
                Create post
              </Typography>
              <UserBox>
                <Avatar
                  sx={{ width: "35px", height: "35px" }}
                  src={user?.profile_photo[user?.profile_photo.length - 1]}
                  onClick={(e) => setOpen(true)}
                ></Avatar>
                <Typography
                  variant="span"
                  fontWeight={300}
                  fontSize="18px"
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
                value={formData.caption}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    caption: e.target.value,
                  });
                }}
                name="caption"
                autoFocus
              />
              {formData.imgUrl !== null && (
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
                    onClick={() => {
                      setFormData({
                        imgUrl: null,
                        file: null,
                      });
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <img
                    src={formData.imgUrl}
                    alt=""
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
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
                    filename={formData.file}
                    name="file"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        file: e.target.files[0],
                        imgUrl: URL.createObjectURL(e.target.files[0]),
                      });
                    }}
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
