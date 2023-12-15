import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UploadInputStyle } from "../../screens/Profile/profileStyle";
import CameraIcon from "@mui/icons-material/Camera";
import CustomModal from "../../components/CustomModal";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";

const UpdateProfileModal = ({
  showUpdateModal,
  setShowUpdateModal,
  setCoverPic,
  setProfilePic,
  setCoverPreviews,
  setImgPreview,
  profileData,
  handleInputChange,
  loadingUpdateBtn,
  imgPreview,
  profilePic,
  coverPic,
  coverPreviews,
  updateProfile,
}) => {
  return (
    <>
      <CustomModal
        open={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setCoverPic(null);
          setProfilePic(null);
          setImgPreview(null);
          setCoverPreviews(null);
        }}
        title={"Edit Profile"}
      >
        <FormControl fullWidth sx={{ display: "flex", gap: "20px" }}>
          <TextField
            type="text"
            label="Name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={profileData?.name}
            name="name"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            onChange={handleInputChange}
            value={profileData?.email}
          />
          <TextField
            type="text"
            label="Bio"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            name="bio"
            value={profileData?.bio}
          />
          <TextField
            type="text"
            label="Lives in"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            name="livesIn"
            value={profileData?.livesIn}
          />
          <TextField
            type="text"
            label="Social Links"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            name="socialLinks"
            value={profileData?.socialLinks}
          />
          <Button component="label" variant="contained">
            <CameraIcon sx={{ margin: "0 5px" }} /> Add Profile Pic
            <input
              filename={profilePic}
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              accept="image/*"
              style={UploadInputStyle}
            />
            {imgPreview && (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <img
                  src={imgPreview}
                  alt="img"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </Box>
            )}
          </Button>
          <Button component="label" variant="contained">
            <CameraIcon sx={{ margin: "0 5px" }} /> Add Cover Picture
            <input
              filename={coverPic}
              type="file"
              onChange={(e) => setCoverPic(e.target.files[0])}
              accept="image/*"
              style={UploadInputStyle}
            />
            {coverPreviews && (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <img
                  src={coverPreviews}
                  alt=""
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </Box>
            )}
          </Button>

          <LoadingButton
            loading={loadingUpdateBtn}
            variant="contained"
            fullWidth
            onClick={() => updateProfile(profilePic)}
          >
            UPDATE
          </LoadingButton>
        </FormControl>
      </CustomModal>
    </>
  );
};

export default UpdateProfileModal;
