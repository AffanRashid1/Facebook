import React, { useState } from "react";
import { Avatar, Box, Card, InputBase, Divider, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiManager from "../../helper/apiManager";
import { addInputStyle } from "./postStyles";
import CreatePostModal from "./CreatePostModal";
import CreatePostIcons from "./CreatePostIcons";

const CreatePost = ({ profilePosts, getFeedPosts, isProfile }) => {
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
      data.append("caption", formData.caption);
      data.append("postImage", formData.file);

      let res = await apiManager({
        method: "post",
        path: `/posts/createPost`,
        params: data,
        header: {
          "Content-Type": "multipart/form-data",
        },
      });

      isProfile ? profilePosts() : getFeedPosts();
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
                autoFocus
              />
            </Box>
          </Stack>
          <Divider variant="middle" />
          <CreatePostIcons setOpen={setOpen} />
        </Card>
      </Box>

      {/* add profilePosts modal */}

      <CreatePostModal
        open={open}
        setFormData={setFormData}
        initialFormData={initialFormData}
        createPost={createPost}
        setOpen={setOpen}
        loadingBtn={loadingBtn}
        formData={formData}
      />
    </>
  );
};
export default CreatePost;
