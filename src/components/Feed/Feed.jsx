import { Box, Skeleton, Typography } from "@mui/material";
import Post from "../Post/Post";
import CreatePost from "../Post/CreatePost";
import Stories from "../Stories/Stories";
import { useEffect, useState } from "react";
import apiManager from "../../helper/apiManager";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const getFeedPosts = async () => {
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
    getFeedPosts();
  }, []);

  return (
    <Box sx={{ paddingTop: { md: "70px", sm: "50px", xs: "25px" } }}>
      <Stories />
      <CreatePost
        getFeedPosts={() => {
          getFeedPosts();
        }}
      />
      {!allPosts?.length ? (
        <Typography textAlign={"center"} color="typography.light">
          No Post Yet
        </Typography>
      ) : (
        allPosts.map((post, i) => {
          return (
            <Post
              key={i}
              data={post}
              getFeedPosts={() => {
                getFeedPosts();
              }}
            />
          );
        })
      )}
    </Box>
  );
};
export default Feed;
