import React, { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { PermIdentity } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import CustomModal from "../CustomModal";

const ProfilePicMenu = ({ picMenu, setPicMenu, modalStyle, updateProfile }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const [showPic, setShowPic] = useState(false);

  const menuOpen = Boolean(picMenu);
  const user = useSelector((state) => state.appReducer.user);

  useEffect(() => {
    if (profilePic) {
      console.log(profilePic);
      setProfilePreview(URL.createObjectURL(profilePic));
      setProfilePicModal(true);
    }
  }, [profilePic]);

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
        <MenuItem onClick={() => setShowPic(true)}>
          <PermIdentity sx={{ margin: "0 5px" }} />
          Show Profile Picture
        </MenuItem>
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
            filename={profilePic}
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </MenuItem>
      </Menu>

      {/* Modal  */}

      {/* Profile Pic Modal */}

      <CustomModal
        open={profilePicModal}
        onClose={() => {
          setProfilePicModal(false);
        }}
        title="Update Profile Picture"
      >
        <Box sx={modalStyle}>
          {profilePreview !== null ? (
            <Box
              sx={{
                width: "100%",
              }}
            >
              <IconButton
                sx={{
                  position: "relative",
                  top: "60px",
                  right: { md: "-85%", sm: "-80%", xs: "-80%" },
                  bgcolor: "background.paper",
                }}
                onClick={() => {
                  setProfilePicModal(false);
                  setProfilePreview(null);
                  setProfilePic(null);
                }}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={profilePreview}
                alt=""
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  margin: "10px 0",
                }}
              />
            </Box>
          ) : (
            ""
          )}
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              updateProfile(profilePic);
            }}
          >
            UPDATE PROFILE PICTURE
          </Button>
        </Box>
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
