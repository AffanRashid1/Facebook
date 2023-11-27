import { Avatar, Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cover from "../assets/Post_1.jpg";
import profile from "../assets/post.jpeg";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.appReducer.user);

  const [userPost, setuserPost] = useState([]);

  const myPosts = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/posts/user-post`
      );
      setuserPost(response?.data?.Posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    myPosts();
  }, []);
  return (
    <>
      <Container>
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
              color: "black",
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
        <Box>
          {userPost?.length == undefined || 0 ? (
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
                    likes={post.likes.length}
                    comment="2"
                    updateProfileData={() => myPosts()}
                    data={post}
                  />
                );
              })
              .reverse()
          )}
        </Box>
      </Container>
    </>
  );
};

export default Profile;
