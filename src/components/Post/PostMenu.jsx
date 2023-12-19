import React, { useState } from "react";
import { useSelector } from "react-redux";
import apiManager from "../../helper/apiManager";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const PostMenu = ({
  anchorEl,
  open,
  setAnchorEl,
  data,
  isProfile,
  getFeedPosts,
  updateProfileData,
}) => {
  const [delLoading, setDelLoading] = useState(false);
  const user = useSelector((state) => state.appReducer.user);

  const deletePost = async () => {
    setDelLoading(true);
    try {
      let response = await apiManager({
        method: "delete",
        path: `/posts/deletePost/${data?._id}`,
      });
      isProfile ? updateProfileData() : getFeedPosts();
      toast.success(response?.data?.message);
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDelLoading(false);
    }
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        {data?.postOwner?._id === user?._id && (
          <MenuItem onClick={deletePost} disabled={delLoading}>
            Delete
            <LoadingButton variant="text" loading={delLoading} />
          </MenuItem>
        )}
        <MenuItem>Report</MenuItem>
      </Menu>
    </>
  );
};

export default PostMenu;
