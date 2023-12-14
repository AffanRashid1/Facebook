import Sidebar from "../../components/SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Feed from "../../components/Feed/Feed";
import { Stack, Box, Grid } from "@mui/material";
import Right from "../../components/RightBar/Right";

const Home = () => {
  return (
    <>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Grid container xs={12}>
          <Grid item lg={4} md={4} sm={0} xs={0}>
            <Sidebar />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={0}>
            <Feed />
          </Grid>
          <Grid item container lg={4} md={0} xs={0} justifyContent="flex-end">
            <Right />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
