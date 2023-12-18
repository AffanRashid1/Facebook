import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { AvatarStyle } from "../../screens/Profile/profileStyle";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfilePicMenu from "./ProfilePicMenu";

const ProfileHero = ({ updateProfile }) => {
  const [picMenu, setPicMenu] = useState(null);
  const user = useSelector((state) => state.appReducer.user);
  return (
    <>
      <Box
        sx={{
          background: `url(${user?.cover_photo})`,
          bgcolor: "gray",
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "25vh",
        }}
        mb={{ xs: 30, md: 20 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          spacing={5}
          justifyContent="space-between"
          sx={{
            position: "relative",
            top: "19vh",
            padding: "0 20px",
            zIndex: 5,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            spacing={3}
          >
            <Box>
              <Avatar
                sx={AvatarStyle}
                src={user?.profileImages}
                alt=""
                onClick={(event) => {
                  setPicMenu(event.currentTarget);
                }}
              />
            </Box>

            {/* profile pic menu  */}

            <ProfilePicMenu
              picMenu={picMenu}
              setPicMenu={setPicMenu}
              updateProfile={updateProfile}
            />

            <Typography
              sx={{
                color: "text.primary",
                fontSize: { xs: "30px", sm: "35px" },
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              {user?.name}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ProfileHero;
