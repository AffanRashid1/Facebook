import { Button, Card, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkIcon from "@mui/icons-material/Link";
import CustomModal from "../../components/CustomModal";
import { setUser } from "../../store/reducer";
import apiManager from "../../helper/apiManager";
import { toast } from "react-toastify";
import UpdateProfileModal from "./UpdateProfileModal";

const Intro = ({ showUpdateModal, setShowUpdateModal }) => {
  const [coverPic, setCoverPic] = useState(null);
  const [coverPreviews, setCoverPreviews] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loadingUpdateBtn, setLoadingUpdateBtn] = useState(false);
  const user = useSelector((state) => state.appReducer.user);

  const [profileData, setProfileData] = useState({
    name: user?.name,
    email: user?.email,
    bio: user?.bio,
    socialLinks: user?.socialLinks,
    livesIn: user?.liveIn,
  });

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const updateProfile = async (profile) => {
    try {
      setLoadingUpdateBtn(true);
      let formData = new FormData();

      const data = {
        profile_photo: profile,
        cover_photo: coverPic,
        name: profileData.name,
        email: profileData.email,
        bio: profileData.bio,
        liveIn: profileData.livesIn,
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
      setImgPreview(null);
      setShowUpdateModal(false);

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.message);
      setLoadingUpdateBtn(false);
    } finally {
      setLoadingUpdateBtn(false);
    }
  };

  useEffect(() => {
    if (profilePic) {
      setImgPreview(URL.createObjectURL(profilePic));
    }
    if (coverPic) {
      setCoverPreviews(URL.createObjectURL(coverPic));
    }
  }, [profilePic, coverPic]);
  return (
    <>
      <Card
        sx={{
          borderRadius: "10px",
          padding: "20px",
          position: "sticky",
          top: "70px",
          maxHeight: "70vh",
        }}
      >
        <Typography
          color="typography.dark"
          fontWeight="bold"
          fontSize="25px"
          letterSpacing="4"
        >
          Intro
        </Typography>
        {user?.bio == "undefined" ? null : (
          <Typography
            textAlign="center"
            color="typography.dark"
            margin="15px 0"
            fontStyle="italic"
          >
            {user?.bio}
          </Typography>
        )}
        <Divider />
        {user?.email === "undefined" ? null : (
          <Stack direction="row" spacing={3} margin="10px 0">
            <AlternateEmailIcon sx={{ color: "typography.dark" }} />
            <Typography>{user?.email}</Typography>
          </Stack>
        )}
        {user?.liveIn && (
          <Stack direction="row" spacing={3} margin="10px 0">
            <HouseIcon sx={{ color: "typography.dark" }} />
            <Typography>Lives in {user?.liveIn}</Typography>
          </Stack>
        )}
        {user?.socialLinks && (
          <Stack direction="row" spacing={3} margin="10px 0">
            <LinkIcon sx={{ color: "typography.dark" }} />
            <a
              href={user?.socialLinks}
              style={{ color: "#2374E1", textDecoration: "none" }}
              target="_blank"
            >
              {user?.socialLinks}
            </a>
          </Stack>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            setShowUpdateModal(true);
          }}
          sx={{
            bgcolor: "action.selected",
            margin: "6px 0",
          }}
        >
          <EditIcon />
          Edit Profile
        </Button>
      </Card>

      {/* Update Profile Modal  */}

      <UpdateProfileModal
        coverPreviews={coverPreviews}
        coverPic={coverPic}
        profilePic={profilePic}
        imgPreview={imgPreview}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        setCoverPic={setCoverPic}
        setProfilePic={setProfilePic}
        setCoverPreviews={setCoverPreviews}
        setImgPreview={setImgPreview}
        handleInputChange={handleInputChange}
        loadingUpdateBtn={loadingUpdateBtn}
        updateProfile={updateProfile}
        profileData={profileData}
      />
    </>
  );
};

export default Intro;
