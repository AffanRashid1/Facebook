import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import { Stack, Box, createTheme, ThemeProvider } from "@mui/material";

const Home = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          {/* navbar */}
          <Navbar />
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Sidebar setMode={setMode} mode={mode} />
            <Feed />
            <Rightbar />
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Home;
