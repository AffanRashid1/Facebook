import React from "react";
import { useSpring, animated } from "react-spring";
import logo from "../assets/logo.png";
import { Box } from "@mui/material";

export default function Loader() {
  const translateAnimation = useSpring({
    from: { transform: "translateY(25%)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1, transition: "0.5s ease in" },
    config: { duration: 500 },
  });

  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        background: "white",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100px",
            sm: "120px",
            md: "250px",
          },
        }}
      >
        <animated.img
          src={logo}
          alt="icon"
          width="100%"
          style={translateAnimation}
        />
      </Box>
    </Box>
  );
}
