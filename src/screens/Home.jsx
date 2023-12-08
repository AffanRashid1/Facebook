import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import { Stack, Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        {/* navbar */}
        <Navbar />
        <Stack direction="row" justifyContent={"space-between"}>
          <Sidebar />
          <Feed />
          <Rightbar />
        </Stack>
      </Box>
    </>
  );
};

export default Home;
