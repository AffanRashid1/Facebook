import { IconButton, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Friends, Home, Marketplace, Videos, Games } from "../../assets/assets";

const NavCenter = () => {
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent="space-between"
        width="30%"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Link to="/">
          <IconButton>
            <img src={Home} alt="" />
          </IconButton>
        </Link>
        <IconButton>
          <img src={Friends} alt="" />
        </IconButton>
        <IconButton>
          <img src={Marketplace} alt="" />
        </IconButton>
        <IconButton>
          <img src={Videos} alt="" />
        </IconButton>
        <IconButton>
          <img src={Games} alt="" />
        </IconButton>
      </Stack>
    </>
  );
};

export default NavCenter;
