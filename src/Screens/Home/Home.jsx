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
        <Grid container spacing={3} p="0 10px">
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={6}>
            <Feed />
          </Grid>
          <Grid item container xs={3} justifyContent="flex-end">
            <Grid item xs={9}>
              <Right />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
