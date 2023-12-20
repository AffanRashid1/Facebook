import React, { useState } from "react";
import { Avatar, Badge, IconButton, Stack } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Notifications } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { IconsBorder } from "./navbarStyles";
import NavMenu from "./NavMenu";

const NavRight = ({ setLogoutLoading }) => {
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.appReducer.user);

  return (
    <>
      <Stack direction="row" alignItems="center">
        <IconButton>
          <IconsBorder>
            <Badge badgeContent={4} color="error">
              <MailIcon
                sx={{
                  color: "text.secondary",
                }}
              />
            </Badge>
          </IconsBorder>
        </IconButton>
        <IconButton>
          <IconsBorder>
            <Badge badgeContent={9} color="error">
              <Notifications
                sx={{
                  color: "text.secondary",
                }}
              />
            </Badge>
          </IconsBorder>
        </IconButton>
        <Avatar
          sx={{
            width: "35px",
            height: "35px",
            border: "2px solid transparent",
            outline: "2px solid grey",
            m: "0 10px",
          }}
          src={user?.profile_photo}
          onClick={(e) => setOpen(true)}
        />
      </Stack>
      <NavMenu {...{ setLogoutLoading, open, setOpen }} />
    </>
  );
};

export default NavRight;
