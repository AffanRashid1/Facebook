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

import apiManager from "../../helper/apiManager";
import Navbar from "../../components/Navbar/Navbar";
import usePageTitle from "../../hooks/usePageTitle";
import Intro from "../../components/Profile/Intro";
import ProfileHero from "../../components/Profile/ProfileHero";

const Profile = () => {
  const [userPost, setUserPost] = useState([]);
  const [isProfile, setIsProfile] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
          <ProfileHero />
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
