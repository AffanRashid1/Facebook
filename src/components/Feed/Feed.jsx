import { Box, Skeleton, Typography } from "@mui/material";
import Post from "../Post/Post";
import AddPost from "../Post/AddPost";
import Stories from "../Stories/Stories";
import { useEffect, useState } from "react";
import apiManager from "../../helper/apiManager";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const feedPosts = async () => {
    try {
      const response = await apiManager({
        method: "get",
        path: `/posts`,
      });
      setAllPosts(response?.data?.payload);
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
      {!allPosts?.length ? (
        <Typography textAlign={"center"} color="typography.light">
          No Post Yet
        </Typography>
      ) : (
        allPosts.map((post, i) => {
          return postLoading ? (
            <Box sx={{ marginBottom: "15px" }}>
              <Skeleton variant="rectangular" height="50vh" animation="wave" />
            </Box>
          ) : (
            <Post
              key={i}
              data={post}
              feedPosts={() => {
                feedPosts();
              }}
            />
          );
        })
      )}
    </Box>
  );
};
export default Feed;
