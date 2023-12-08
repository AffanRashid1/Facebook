import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Rightbar from "../Components/Rightbar";
import Feed from "../Components/Feed";
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
