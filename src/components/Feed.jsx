import { Box } from "@mui/material";
import Post from "./Post";
import AddPost from "./AddPost";
import Stories from "./Stories";

const Feed = () => {
  return (
    <Box flex={3} p={2} sx={{ paddingTop: "84px" }}>
      <Stories />
      <AddPost />
      {/* <Post /> */}
    </Box>
  );
};
export default Feed;
