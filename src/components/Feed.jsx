import { Box, Typography } from "@mui/material";
import Post from "./Post";
import AddPost from "./AddPost";
import Stories from "./Stories";
import { useEffect, useState } from "react";
import apiManager from "../Helper/ApiManager";

const Feed = () => {
  const [allPosts, setallPosts] = useState([]);

  const feedPosts = async () => {
    try {
      const response = await apiManager({
        method: "get",
        path: `/posts`,
      });

      setallPosts(response?.data?.payload);
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
      <AddPost
        feedPosts={() => {
          feedPosts();
        }}
      />
      {allPosts?.length == undefined || 0 ? (
        <Typography textAlign={"center"}>No Post Yet</Typography>
      ) : (
        allPosts
          .map((post, i) => {
            return (
              <Post
                key={i}
                image={post?.imageUrl}
                createdAt={post?.createdAt}
                description={post?.caption}
                name={post?.owner?.name}
                icon={post?.owner?.profile_photo}
                id={post?._id}
                shareCount="32"
                likes={post.likes}
                comment={post.comments}
                feedPosts={() => {
                  feedPosts();
                }}
              />
            );
          })
          .reverse()
      )}
    </Box>
  );
};
export default Feed;
