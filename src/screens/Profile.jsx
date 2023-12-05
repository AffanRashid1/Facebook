import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import axios from "axios";
import HouseIcon from "@mui/icons-material/House";
import apiManager from "../Helper/ApiManager";

const Profile = () => {
  const user = useSelector((state) => state.appReducer.user);

  const [userPost, setuserPost] = useState([]);

  const myPosts = async () => {
    try {
      let response = await apiManager({
        method: "get",
        path: `/posts/user-post`,
      });
      setuserPost(response?.data?.payload);
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
        <Box
          sx={{
            backgroundImage: `url(${"https://imgs.search.brave.com/J-yPqU2rCdwiuszegSxJSxM1S76_lPMFiMab7LLaMDI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE4Mjg5/MzEuanBn"})`,
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundSize: "cover",
            height: { xs: "20vh", sm: "30vh" },
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "13vh", sm: "20vh", md: "22vh" },
            marginLeft: { xs: 0, sm: "60px" },
            display: "flex",
            alignItems: "center",
            gap: { xs: "10px", sm: "30px" },
            flexDirection: { xs: "column", sm: "row" },
            userSelect: "none",
          }}
        >
          <Avatar
            sx={{
              width: "200px",
              height: "200px",
              padding: 0,
              margin: 0,
              borderRadius: "50%",
              border: "5px solid grey",
              outline: "3px solid white",
            }}
            src={user?.profile_photo[user?.profile_photo.length - 1]}
          />
          {/* <img
            src={user?.profile_photo}
            style={{
              width: "20%",
              height: "20%",
              padding: 0,
              margin: 0,
              borderRadius: "50%",
              border: "5px solid grey",
              outline: "3px solid white",
            }}
            alt="profile"
          /> */}
          <Typography
            sx={{
              color: "text.primary",
              fontSize: { xs: "25px", sm: "35px" },
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {user?.name}
          </Typography>
        </Box>
        <Box sx={{ marginTop: { md: "20%", sm: "20%", xs: "30%" } }}>
          <AddPost post={() => myPosts()} />
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Card
            sx={{
              borderRadius: "10px",
              padding: "20px",
              position: "sticky",
              top: "10px",
              width: "29%",
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
            <Typography
              textAlign="center"
              color="typography.dark"
              margin="15px 0"
            >
              Growing one experience at a time ⏲️ Capturing moments 📸
            </Typography>
            <Divider />
            <Stack direction="row" spacing={3} margin="10px 0">
              <HouseIcon sx={{ color: "typography.dark" }} />
              <Typography>Lives in Miami</Typography>
            </Stack>
          </Card>
          <Box width={"67%"}>
            {userPost?.length === undefined || 0 ? (
              <Typography textAlign={"center"}>No Post Yet</Typography>
            ) : (
              userPost
                .map((post, i) => {
                  return (
                    <Post
                      key={i}
                      image={post.imageUrl}
                      date={post.createdAt}
                      description={post.caption}
                      name={user?.name}
                      icon={user?.profile_photo}
                      id={post._id}
                      shareCount="32"
                      // likes={post.likes.length}
                      comment={post.comments}
                      updateProfileData={() => myPosts()}
                      data={post}
                    />
                  );
                })
                .reverse()
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Profile;
