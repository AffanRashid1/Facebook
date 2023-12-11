import React, { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { PermIdentity } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
const ProfilePicMenu = ({ picMenu, setpicMenu, modalStyle }) => {
  const user = useSelector((state) => state.appReducer.user);
  const [profilePic, setprofilePic] = useState(null);
  const [profilePreview, setprofilePreview] = useState(null);
  const [profilePicModal, setprofilePicModal] = useState(false);
  const [showpic, setshowpic] = useState(false);
  const menuOpen = Boolean(picMenu);

  useEffect(() => {
    if (profilePic) {
      setprofilePreview(URL.createObjectURL(profilePic));
      setprofilePicModal(true);
    }
  }, [profilePic]);

  return (
    <>
      <Menu
        anchorEl={picMenu}
        open={menuOpen}
        onClose={() => {
          setpicMenu(null);
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
        <MenuItem onClick={() => setshowpic(true)}>
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
            onChange={(e) => setprofilePic(e.target.files[0])}
          />
        </MenuItem>
      </Menu>

      {/* Modal  */}

      {/* Profile Pic Modal */}

      <Modal
        open={profilePicModal}
        onClose={() => {
          setprofilePicModal(false);
        }}
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
                  setprofilePicModal(false);
                  setprofilePreview(null);
                  setprofilePic(null);
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
          <Button fullWidth variant="contained">
            UPDATE PROFILE PICTURE
          </Button>
        </Box>
      </Modal>

      {/* show profile pic  */}

      <Modal
        open={showpic}
        onClose={() => {
          setshowpic(false);
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
          <img
            src={user?.profile_photo[user?.profile_photo.length - 1]}
            alt="Profile"
            width="600px"
          />
        </Box>
      </Modal>
    </>
  );
};

export default ProfilePicMenu;
