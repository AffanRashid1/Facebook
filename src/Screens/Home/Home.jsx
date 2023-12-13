import Sidebar from "../../components/SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Feed from "../../components/Feed/Feed";
import { Stack, Box } from "@mui/material";
import RightBar from "../../components/RightBar/RightBar";

const Home = () => {
  return (
    <>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" justifyContent={"space-between"}>
          <Sidebar />
          <Feed />
          <RightBar />
        </Stack>
      </Box>
    </>
  );
};

export default Home;
