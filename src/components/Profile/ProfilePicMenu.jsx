import React, { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { PermIdentity } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import ImagePreview from "../ImagePreview/ImagePreview";

const ProfilePicMenu = ({ picMenu, setPicMenu, updateProfile }) => {
  const [profilePicData, setProfilePicData] = useState({
    profilePic: null,
    profilePreview: null,
  });
  const [profilePicModal, setProfilePicModal] = useState(false);
  const [showPic, setShowPic] = useState(false);
  const menuOpen = Boolean(picMenu);
  const user = useSelector((state) => state.appReducer.user);

  return (
    <>
      <Menu
        anchorEl={picMenu}
        open={menuOpen}
        onClose={() => {
          setPicMenu(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {user?.profileImages?.length !== 0 && (
          <MenuItem onClick={() => setShowPic(true)}>
            <PermIdentity sx={{ margin: "0 5px" }} />
            Show Profile Picture
          </MenuItem>
        )}
        <MenuItem>
          <label
            htmlFor="profilePictureInput"
            style={{ display: "flex", alignItems: "center" }}
          >
            <ImageIcon sx={{ margin: "0 5px" }} />
            Update Profile Picture
          </label>
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            style={{ display: "none" }}
            filename={profilePicData?.profilePic}
            onChange={(e) => {
              setProfilePicData({
                ...profilePicData,
                profilePic: e.target.files[0],
                profilePreview: URL.createObjectURL(e.target.files[0]),
              });
              setProfilePicModal(true);
            }}
          />
        </MenuItem>
      </Menu>

      {/* Profile Pic Modal */}

      <CustomModal
        open={profilePicModal}
        onClose={() => {
          setProfilePicModal(false);
        }}
        title="Update Profile Picture"
      >
        <ImagePreview
          image={profilePicData?.profilePreview}
          onCloseIcon={() => {
            setProfilePicData({});
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            // updateProfile(profilePic);
          }}
        >
          UPDATE PROFILE PICTURE
        </Button>
      </CustomModal>

      {/* show profile pic  */}

      <CustomModal
        open={showPic}
        onClose={() => {
          setShowPic(false);
        }}
        disableAutoFocus
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}
        >
          <img src={user?.profile_photo} alt="Profile" width="600px" />
        </Box>
      </CustomModal>
    </>
  );
};

export default ProfilePicMenu;
