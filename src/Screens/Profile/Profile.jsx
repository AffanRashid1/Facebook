import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from "../../components/Post/CreatePost";
import Post from "../../components/Post/Post";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import apiManager from "../../helper/apiManager";
import CameraIcon from "@mui/icons-material/Camera";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkIcon from "@mui/icons-material/Link";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import ProfilePicMenu from "../../components/Profile/ProfilePicMenu";
import usePageTitle from "../../hooks/usePageTitle";
import { AvatarStyle, UploadInputStyle, modalStyle } from "./profileStyle";
import CustomModal from "../../components/CustomModal";
import { setUser } from "../../store/reducer";

const Profile = () => {
  const [userPost, setUserPost] = useState([]);
  const [isProfile, setIsProfile] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [updateNameInput, setUpdateNameInput] = useState("");
  const [updateEmailInput, setUpdateEmailInput] = useState("");
  const [bio, setBio] = useState("");
  const [livesIn, setLivesIn] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [loadingUpdateBtn, setLoadingUpdateBtn] = useState(false);
  const [picMenu, setPicMenu] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [socialLinks, setSocialLinks] = useState("");
  const [coverPreviews, setCoverPreviews] = useState(null);
  const user = useSelector((state) => state.appReducer.user);
  const dispatch = useDispatch();

  usePageTitle("Profile");

  const myPosts = async () => {
    try {
      let response = await apiManager({
        method: "get",
        path: `/posts/user-post`,
      });
      setUserPost(response?.data?.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (profile) => {
    try {
      setLoadingUpdateBtn(true);
      let formData = new FormData();

      const data = {
        profile_photo: profile,
        cover_photo: coverPic,
        name: updateNameInput,
        email: updateEmailInput,
        bio: bio,
        liveIn: livesIn,
        socialLinks: socialLinks,
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

  useEffect(() => {
    myPosts();
  }, []);

  return (
    <>
      <Container
        sx={{
          bgcolor: "background.paper",
          minHeight: "100vh",
        }}
      >
        <Box mb={8}>
          <Navbar />
        </Box>
        <Box>
          <Box
            sx={{
              background: `url(${user?.cover_photo})`,
              bgcolor: "gray",
              backgroundRepeat: "no-repeat",
              width: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "25vh",
            }}
            mb={{ xs: 30, md: 20 }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              spacing={5}
              justifyContent="space-between"
              sx={{
                position: "relative",
                top: "19vh",
                padding: "0 20px",
                zIndex: 5,
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                spacing={3}
              >
                <Box>
                  <Avatar
                    sx={AvatarStyle}
                    src={user?.profile_photo[user?.profile_photo.length - 1]}
                    alt=""
                    onClick={(event) => {
                      setPicMenu(event.currentTarget);
                    }}
                  />
                </Box>

                {/* profile pic menu  */}

                <ProfilePicMenu
                  picMenu={picMenu}
                  setPicMenu={() => {
                    setPicMenu();
                  }}
                  modalStyle={modalStyle}
                  updateProfile={updateProfile}
                />

                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "30px", sm: "35px" },
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                >
                  {user?.name}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Grid container spacing={2} xs={12} mt={2}>
          <Grid item xs={12} md={6}>
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
              {user?.email == "undefined" ? null : (
                <Stack direction="row" spacing={3} margin="10px 0">
                  <AlternateEmailIcon sx={{ color: "typography.dark" }} />
                  <Typography>{user?.email}</Typography>
                </Stack>
              )}
              {user?.liveIn == "undefined" ? null : (
                <Stack direction="row" spacing={3} margin="10px 0">
                  <HouseIcon sx={{ color: "typography.dark" }} />
                  <Typography>Lives in {user?.liveIn}</Typography>
                </Stack>
              )}
              {user?.socialLinks == "undefined" ? null : (
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
                  setUpdateNameInput(user?.name);
                  setUpdateEmailInput(user?.email);
                  setBio(user?.bio);
                  setLivesIn(user?.liveIn);
                  setSocialLinks(user?.socialLinks);
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
          </Grid>
          <Grid item xs={12} md={6}>
            <CreatePost ProfilePosts={() => myPosts()} isProfile={isProfile} />
            <Box>
              {userPost?.length === undefined || 0 ? (
                <Typography textAlign={"center"}>No Post Yet</Typography>
              ) : (
                userPost.map((post, i) => {
                  return (
                    <Post
                      key={i}
                      data={post}
                      updateProfileData={() => myPosts()}
                      isProfile={isProfile}
                    />
                  );
                })
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Update Modal */}
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
            value={updateNameInput}
            onChange={(e) => {
              setUpdateNameInput(e.target.value);
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={updateEmailInput}
            onChange={(e) => {
              setUpdateEmailInput(e.target.value);
            }}
          />
          <TextField
            type="text"
            label="Bio"
            fullWidth
            variant="standard"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
          <TextField
            type="text"
            label="Lives in"
            fullWidth
            variant="standard"
            value={livesIn}
            onChange={(e) => {
              setLivesIn(e.target.value);
            }}
          />
          <TextField
            type="text"
            label="Social Links"
            fullWidth
            variant="standard"
            value={socialLinks}
            onChange={(e) => {
              setSocialLinks(e.target.value);
            }}
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
                  alt=""
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

export default Profile;
