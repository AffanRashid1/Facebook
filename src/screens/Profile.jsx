import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import cover from "../assets/Post_1.jpg";
import profile from "../assets/post.jpeg";
import AddPost from "../components/AddPost";
import Post from "../components/Post";

const Profile = () => {
  const user = useSelector((state) => state.appReducer.user);
  console.log(user);
  return (
    <>
      <Container>
        <Box
          sx={{
            backgroundImage: `url(${cover})`,
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundSize: "cover",
            height: { xs: "20vh", sm: "30vh" },
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "13vh", sm: "23vh", md: "25vh" },
            marginLeft: { xs: 0, sm: "60px" },
            display: "flex",
            alignItems: "center",
            gap: { xs: "10px", sm: "30px" },
            flexDirection: { xs: "column", sm: "row" },
            // width: "200px",
            // height: "200px",
            userSelect: "none",
          }}
        >
          <img
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
          />
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
        <Box sx={{ marginTop: { md: "15%", sm: "10%", xs: "30%" } }}>
          <AddPost />
        </Box>
        <Box>
          {user.posts
            .map((post, i) => {
              return (
                <Post
                  key={i}
                  image={profile}
                  date={post.createdAt}
                  description={post.caption}
                  name={user?.name}
                  icon={user?.profile_photo}
                  id={post._id}
                  shareCount="32"
                  likes={post.likes.length}
                  comment="2"
                />
              );
            })
            .reverse()}
        </Box>
      </Container>
    </>
  );
};

export default Profile;
