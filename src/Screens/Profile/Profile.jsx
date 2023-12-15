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
import Intro from "../../components/Profile/Intro";

const Profile = () => {
  const [userPost, setUserPost] = useState([]);
  const [isProfile, setIsProfile] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [profilePic, setProfilePic] = useState(null);
  // const [updateNameInput, setUpdateNameInput] = useState("");
  // const [updateEmailInput, setUpdateEmailInput] = useState("");
  // const [bio, setBio] = useState("");
  // const [livesIn, setLivesIn] = useState("");
  // const [imgPreview, setImgPreview] = useState(null);
  const [picMenu, setPicMenu] = useState(null);
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

  // const updateProfile = async (profile) => {
  //   try {
  //     setLoadingUpdateBtn(true);
  //     let formData = new FormData();

  //     const data = {
  //       profile_photo: profile,
  //       cover_photo: coverPic,
  //       name: updateNameInput,
  //       email: updateEmailInput,
  //       bio: bio,
  //       liveIn: livesIn,
  //       socialLinks: socialLinks,
  //     };

  //     Object.entries(data).forEach(([key, value]) => {
  //       formData.append(key, value);
  //     });

  //     let response = await apiManager({
  //       method: "put",
  //       path: `/users/updateUser`,
  //       params: formData,
  //       header: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     dispatch(setUser(response?.data?.payload));
  //     setImgPreview(null);
  //     setShowUpdateModal(false);

  //     toast.success(response?.data?.message);
  //   } catch (error) {
  //     toast.error(error?.message);
  //     setLoadingUpdateBtn(false);
  //   } finally {
  //     setLoadingUpdateBtn(false);
  //   }
  // };

  // useEffect(() => {
  //   if (profilePic) {
  //     setImgPreview(URL.createObjectURL(profilePic));
  //   }
  //   if (coverPic) {
  //     setCoverPreviews(URL.createObjectURL(coverPic));
  //   }
  // }, [profilePic, coverPic]);

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
                {/* 
                <ProfilePicMenu
                  picMenu={picMenu}
                  setPicMenu={() => {
                    setPicMenu();
                  }}
                  modalStyle={modalStyle}
                  updateProfile={updateProfile}
                /> */}

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
            <Intro
              showUpdateModal={showUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
            />
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
    </>
  );
};

export default Profile;
