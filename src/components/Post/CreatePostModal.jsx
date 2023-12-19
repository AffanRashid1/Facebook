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
import { addInputStyle, VisuallyHiddenInput, UserBox } from "./postStyles";

const CreatePostModal = ({
  open,
  setFormData,
  initialFormData,
  createPost,
  setOpen,
  loadingBtn,
  formData,
}) => {
  const user = useSelector((state) => state.appReducer.user);

  return (
    <>
      <Modal
        open={open}
        onClose={(e) => {
          setOpen(false);
          setFormData(initialFormData);
        }}
        disableAutoFocus
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={createPost}>
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
                Create ProfilePosts
              </Typography>
              <UserBox>
                <Avatar
                  sx={{ width: "35px", height: "35px" }}
                  src={user?.profile_photo}
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
              {formData.imgUrl && (
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
                type="submit"
              >
                Post
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default CreatePostModal;
