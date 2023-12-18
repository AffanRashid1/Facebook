import { Button, Card, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkIcon from "@mui/icons-material/Link";
import UpdateProfileModal from "./UpdateProfileModal";
import { a } from "react-spring";

const Intro = () => {
  const user = useSelector((state) => state.appReducer.user);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  return (
    <>
      <Card
        sx={{
          borderRadius: "10px",
          padding: "20px",
          position: "sticky",
          top: "70px",
          maxHeight: "70vh",
        }}
      >
        <Typography
          color="typography.dark"
          fontWeight="bold"
          fontSize="25px"
          letterSpacing="4"
        >
          Intro
        </Typography>
        {user?.about?.bio && (
          <Typography
            textAlign="center"
            color="typography.dark"
            margin="15px 0"
            fontStyle="italic"
          >
            {user?.about?.bio}
          </Typography>
        )}
        <Divider />
        {user?.about?.email && (
          <Stack direction="row" spacing={3} margin="10px 0">
            <AlternateEmailIcon sx={{ color: "typography.dark" }} />
            <Typography>{user?.email}</Typography>
          </Stack>
        )}
        {user?.about?.livesIn && (
          <Stack direction="row" spacing={3} margin="10px 0">
            <HouseIcon sx={{ color: "typography.dark" }} />
            <Typography>Lives in {user?.about?.livesIn}</Typography>
          </Stack>
        )}

        {user?.about?.socialLinks?.map((elem, i) => {
          return (
            <Stack key={i} direction="row" spacing={3} margin="10px 0">
              <LinkIcon sx={{ color: "typography.dark" }} />
              <a
                href={elem?.url}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "skyblue",
                }}
              >
                <Typography>{elem?.url}</Typography>
              </a>
            </Stack>
          );
        })}
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            setShowUpdateModal(true);
          }}
          sx={{
            bgcolor: "action.selected",
            margin: "6px 0",
          }}
        >
          <EditIcon />
          Edit Profile
        </Button>
      </Card>

      {/* Update Profile Modal  */}

      <UpdateProfileModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
    </>
  );
};

export default Intro;
