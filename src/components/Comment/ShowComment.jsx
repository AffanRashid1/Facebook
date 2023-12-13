import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiManager from "../../helper/apiManager";

import { LoadingButton } from "@mui/lab";

const ShowComment = ({ comment, isProfile, updateProfileData, feedPosts }) => {
  const user = useSelector((state) => state.appReducer.user);
  const [menuComment, setMenuComment] = useState(null);
  const [delLoading, setDelLoading] = useState(false);
  const menuOpen = Boolean(menuComment);

  const handleDelComment = async (id) => {
    setDelLoading(true);
    try {
      let response = await apiManager({
        method: "delete",
        path: `/posts/delete-comment/${id}`,
      });
      isProfile ? updateProfileData() : feedPosts();
      setMenuComment(null);
      setDelLoading(false);
      toast.success(response?.data?.message);
    } catch (error) {
      setDelLoading(false);
      console.log(error);
    }
  };

  return (
    <Stack
      direction={"row"}
      spacing={3}
      alignItems={"center"}
      margin={"8px 10px"}
      width="400px"
      id="commentBox"
    >
      <Avatar
        sx={{ height: "22px", width: "22px" }}
        src={
          comment?.owner?.profile_photo[
            comment?.owner?.profile_photo.length - 1
          ]
        }
      />
      <Box
        sx={{
          bgcolor: "action.selected",
          borderRadius: "6px",
          padding: "5px 8px",
          width: "50%",
        }}
      >
        <Typography fontWeight="bold" fontSize="14px" letterSpacing="1px">
          {comment?.owner?.name}
        </Typography>
        <Typography fontSize={"15px"} sx={{ overflowWrap: "break-word" }}>
          {comment?.comment}
        </Typography>
      </Box>
      <IconButton
        onClick={(event) => {
          setMenuComment(event.currentTarget);
        }}
      >
        <MoreHorizIcon sx={{ color: "typography.light" }} />
      </IconButton>
      <Menu
        anchorEl={menuComment}
        open={menuOpen}
        onClose={() => {
          setMenuComment(null);
        }}
      >
        {comment?.owner?._id === user?._id ? (
          <MenuItem
            onClick={() => {
              handleDelComment(comment?._id);
            }}
          >
            Delete
            <LoadingButton variant="text" loading={delLoading} />
          </MenuItem>
        ) : null}
        <MenuItem>Hide Comment</MenuItem>
      </Menu>
    </Stack>
  );
};

export default ShowComment;
