import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Post from "../Post/Post";
import CreatePost from "../Post/CreatePost";
import Stories from "../Stories/Stories";
import apiManager from "../../helper/apiManager";
import { toast } from "react-toastify";

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
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getFeedPosts();
  }, []);

  return (
    <Box sx={{ paddingTop: { md: "70px", sm: "50px", xs: "25px" } }}>
      <Stories />
      <CreatePost getFeedPosts />
      {!allPosts?.length ? (
        <Typography textAlign="center" color="typography.dark">
          No Post Yet
        </Typography>
      ) : (
        allPosts.map((post, i) => {
          return (
            <Post
              key={post._id}
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
