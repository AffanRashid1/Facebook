import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import { Stack, Box, createTheme, ThemeProvider } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        {/* navbar */}
        <Navbar />
        <Stack
          direction="row"
          // spacing={2}
          justifyContent={"space-between"}
        >
          <Sidebar />
          <Feed />
          <Rightbar />
        </Stack>
      </Box>
    </>
  );
};

export default Home;
