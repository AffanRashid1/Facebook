import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UploadInputStyle } from "../../screens/Profile/profileStyle";
import CameraIcon from "@mui/icons-material/Camera";
import CustomModal from "../../components/CustomModal";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/reducer";
import apiManager from "../../helper/apiManager";
import { toast } from "react-toastify";
import ImagePreview from "../ImagePreview/ImagePreview";

const UpdateProfileModal = ({ showUpdateModal, setShowUpdateModal }) => {
  const [loadingUpdateBtn, setLoadingUpdateBtn] = useState(false);
  const user = useSelector((state) => state.appReducer.user);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    name: user?.name,
    email: user?.email,
    bio: user?.about?.bio,
    socialLinks: user?.about?.socialLinks,
    livesIn: user?.about?.livesIn,
    profilePic: null,
    profilePreview: user?.profileImage,
    coverPic: null,
    coverPreview: user?.coverImage,
  });

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (profile) => {
    try {
      setLoadingUpdateBtn(true);
      let formData = new FormData();

      const data = {
        profileImage: profile,
        coverImage: profileData?.coverPic,
        name: profileData.name,
        email: profileData.email,
        bio: profileData.bio,
        livesIn: profileData.livesIn,
        socialLinks: profileData.socialLinks,
      };

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      let response = await apiManager({
        method: "put",
        path: `/users/updateUser`,
        params: formData,
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setUser(response?.data?.payload));
      setShowUpdateModal(false);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoadingUpdateBtn(false);
    }
  };

  return (
    <>
      <CustomModal
        open={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
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
              filename={profileData?.profilePic}
              type="file"
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  profilePic: e.target.files[0],
                  profilePreview: URL.createObjectURL(e.target.files[0]),
                });
              }}
              accept="image/*"
              style={UploadInputStyle}
              name="profilePic"
            />
          </Button>
          <ImagePreview
            image={profileData?.profilePreview}
            onCloseIcon={() => {
              setProfileData({
                ...profileData,
                profilePic: null,
                profilePreview: null,
              });
            }}
          />

          <Button component="label" variant="contained">
            <CameraIcon sx={{ margin: "0 5px" }} /> Add Cover Picture
            <input
              filename={profileData?.coverPic}
              type="file"
              accept="image/*"
              style={UploadInputStyle}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  coverPic: e.target.files[0],
                  coverPreview: URL.createObjectURL(e.target.files[0]),
                });
              }}
              name="coverPic"
            />
          </Button>

          <ImagePreview
            image={profileData?.coverPreview}
            onCloseIcon={() => {
              setProfileData({
                ...profileData,
                coverPic: null,
                coverPreview: null,
              });
            }}
          />

          <LoadingButton
            loading={loadingUpdateBtn}
            variant="contained"
            fullWidth
            onClick={() => updateProfile(profileData?.profilePic)}
          >
            UPDATE
          </LoadingButton>
        </FormControl>
      </CustomModal>
    </>
  );
};

export default UpdateProfileModal;
