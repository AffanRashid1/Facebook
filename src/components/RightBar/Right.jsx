import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import React from "react";

const Right = () => {
  const allUsers = useSelector((state) => state.appReducer.allUsers);

  return (
    <>
      <Stack
        sx={{
          position: "fixed",
          top: "70px",
          display: { xs: "none", md: "block" },
        }}
      >
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={19}
          padding="0 12px"
          margin="10px 0"
        >
          <Typography variant="p" fontWeight={500} mt={2} mb={2}>
            Contacts
          </Typography>
          <Stack spacing={1} direction="row">
            <VideoCallIcon sx={{ color: "#999", fontSize: "25px" }} />
            <SearchIcon sx={{ color: "#999", fontSize: "25px" }} />
            <MoreHorizIcon sx={{ color: "#999", fontSize: "25px" }} />
          </Stack>
        </Stack>
        <List>
          {allUsers.map((user, i) => {
            return (
              <ListItem disablePadding key={i}>
                <ListItemButton component="a" href="#home" disablePadding>
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        width: "25px",
                        height: "25px",
                        border: "2px solid transparent",
                        outline: "2px solid grey",
                      }}
                      src={user?.profile_photo}
                    />
                  </ListItemIcon>
                  <ListItemText primary={user?.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </>
  );
};

export default Right;
