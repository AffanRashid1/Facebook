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
import { useSelector } from "react-redux";
import AddPost from "../components/Post/AddPost";
import Post from "../components/Post/Post";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import apiManager from "../helper/apiManager";
import CameraIcon from "@mui/icons-material/Camera";
import LinkIcon from "@mui/icons-material/Link";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import ProfilePicMenu from "../components/Profile/ProfilePicMenu";
import usePageTitle from "../hooks/usePageTitle";

const Profile = () => {
  const user = useSelector((state) => state.appReducer.user);
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
      formData.append("profile_photo", profile);
      formData.append("cover_photo", coverPic);
      formData.append("name", updateNameInput);
      formData.append("email", updateEmailInput);
      formData.append("bio", bio);
      formData.append("liveIn", livesIn);
      formData.append("socialLinks", socialLinks);

      let response = await apiManager({
        method: "put",
        path: `/users/updateUser`,
        params: formData,
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    borderRadius: "10px",
    pb: 3,
    color: "action.selected",
  };

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
              background: `url(${
                user?.cover_photo[user?.cover_photo?.length - 1]
              })`,
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
                    sx={{
                      width: "200px",
                      height: "200px",
                      padding: 0,
                      margin: 0,
                      borderRadius: "50%",
                      border: "5px solid grey",
                      cursor: "pointer",
                      outline: "3px solid white",
                      bgcolor: "gray",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        opacity: "0.7",
                      },
                    }}
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
              {user?.liveIn == "" ? null : (
                <Stack direction="row" spacing={3} margin="10px 0">
                  <HouseIcon sx={{ color: "typography.dark" }} />
                  <Typography>Lives in {user?.liveIn}</Typography>
                </Stack>
              )}
              <Stack direction="row" spacing={3} margin="10px 0">
                <LinkIcon sx={{ color: "typography.dark" }} />
                <a
                  href={user?.socialLinks[0]}
                  style={{ color: "#2374E1", textDecoration: "none" }}
                  target="_blank"
                >
                  {user?.socialLinks[0]}
                </a>
              </Stack>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setShowUpdateModal(true);
                  setUpdateNameInput(user?.name);
                  setUpdateEmailInput(user?.email);
                  setBio(user?.bio);
                  setLivesIn(user?.liveIn);
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
            <AddPost post={() => myPosts()} isProfile={isProfile} />
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
      <Modal
        open={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setCoverPic(null);
          setProfilePic(null);
          setImgPreview(null);
          setCoverPreviews(null);
        }}
        disableAutoFocus
      >
        <Box sx={modalStyle}>
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
                style={{
                  clip: "rect(0 0 0 0)",
                  clipPath: "inset(50%)",
                  height: 1,
                  overflow: "hidden",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  whiteSpace: "nowrap",
                  width: 1,
                }}
              />
              {imgPreview !== null && (
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
                style={{
                  clip: "rect(0 0 0 0)",
                  clipPath: "inset(50%)",
                  height: 1,
                  overflow: "hidden",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  whiteSpace: "nowrap",
                  width: 1,
                }}
              />
              {coverPreviews !== null ? (
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
              ) : (
                ""
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
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
