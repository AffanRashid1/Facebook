import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import cover from "../assets/Post_1.jpg";
import profile from "../assets/Post_6.jpg";
import AddPost from "../components/AddPost";
import Post from "../components/Post";

const Profile = () => {
  const user = useSelector((state) => state.appReducer.user);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "no-repeat",
          width: "100vw",
          backgroundSize: "cover",
          height: { xs: "20vh", sm: "30vh" },
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "13vh", sm: "19vh" },
          marginLeft: { xs: 0, sm: "60px" },
          display: "flex",
          alignItems: "center",
          gap: { xs: "10px", sm: "30px" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <img
          src={user?.profile_photo}
          style={{
            width: "30%",
            padding: 0,
            margin: 0,
            borderRadius: "50%",
            border: "5px solid grey",
            outline: "3px solid white",
          }}
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
      <Box sx={{ marginTop: "250px" }}>
        <AddPost />
      </Box>
      <Box>
        {user.posts.map((post, i) => {
          return (
            <Post
              image={post.image}
              date={post.createdAt}
              description={post.caption}
              name={user?.name}
              icon={user?.profile_photo}
              id={i}
              shareCount="32"
              likes="2"
              comment="2"
            />
          );
        })}
      </Box>
    </>
  );
};

export default Profile;
