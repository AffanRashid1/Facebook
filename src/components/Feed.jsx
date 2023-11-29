import { Box, Typography } from "@mui/material";
import Post from "./Post";
import AddPost from "./AddPost";
import Stories from "./Stories";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Feed = () => {
  const user = useSelector((state) => state.appReducer.user);
  const [allPosts, setallPosts] = useState([]);

  const feedPosts = async () => {
    try {
      let resp = await axios.get(`${process.env.REACT_APP_API_KEY}/posts`);
      setallPosts(resp?.data?.Posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    feedPosts();
  }, []);

  return (
    <Box flex={1.5} p={2} sx={{ paddingTop: "84px" }}>
      <Stories />
      <AddPost />
      {allPosts?.length == undefined || 0 ? (
        <Typography textAlign={"center"}>No Post Yet</Typography>
      ) : (
        allPosts
          .map((post, i) => {
            return (
              <Post
                key={i}
                image={post.imageUrl}
                createdAt={post.createdAt}
                description={post.caption}
                name={post?.owner?.name}
                icon={post?.owner?.profile_photo}
                id={post._id}
                shareCount="32"
                likes={post.likes.length}
                comment={post.comments}
                allPosts={allPosts}
              />
            );
          })
          .reverse()
      )}
    </Box>
  );
};
export default Feed;
