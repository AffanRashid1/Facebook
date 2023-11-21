import { Box } from "@mui/material";
import Post from "./Post";
import AddPost from "./AddPost";
import Stories from "./Stories";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import profile from "../assets/post.jpeg";

const Feed = () => {
  const user = useSelector((state) => state.appReducer.user);
  const [allPosts, setallPosts] = useState([]);

  const feedPosts = async () => {
    try {
      let resp = await axios.get("http://localhost:5000/posts");
      setallPosts(resp?.data?.Posts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    feedPosts();
  }, []);
  return (
    <Box flex={3} p={2} sx={{ paddingTop: "84px" }}>
      <Stories />
      <AddPost />
      {allPosts.map((post, i) => {
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
      })}
    </Box>
  );
};
export default Feed;
