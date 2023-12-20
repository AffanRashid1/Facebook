import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AppsIcon from "@mui/icons-material/Apps";
import GroupsIcon from "@mui/icons-material/Groups";
import { Divider, Typography } from "@mui/material";

const Sidebar = () => {
  const user = useSelector((state) => state.appReducer.user);

  let iconStyle = { color: "#1DA1F2", fontSize: "27px" };

  return (
    <Box
      p={2}
      sx={{
        display: { xs: "none", md: "block" },
        paddingTop: "84px",
        position: "fixed",
        width: "20%",
      }}
    >
      <List>
        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: "35px",
                    height: "35px",
                    border: "2px solid transparent",
                    outline: "1px solid grey",
                  }}
                  src={user?.profile_photo}
                ></Avatar>
              </ListItemIcon>
              <Typography sx={{ color: "text.primary" }}>
                {user?.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider variant="fullWidth" sx={{ margin: "10px 0" }} />
        <ListItem disablePadding>
          <ListItemButton component="a" href="#video">
            <ListItemIcon>
              <LiveTvIcon sx={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Video" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#marketPlace">
            <ListItemIcon>
              <StorefrontIcon sx={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Marketplace" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#gaming">
            <ListItemIcon>
              <SportsEsportsIcon sx={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Gaming" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#settings">
            <ListItemIcon>
              <Settings sx={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#groups">
            <ListItemIcon>
              <GroupsIcon sx={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#groups">
            <ListItemIcon>
              <GroupsIcon sx={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#seeMore">
            <ListItemIcon>
              <AppsIcon sx={{ color: "#999", fontSize: "25px" }} />
            </ListItemIcon>
            <ListItemText primary="See more" />
          </ListItemButton>
        </ListItem>

        <Divider variant="fullWidth" sx={{ margin: "10px 0" }} />
      </List>
    </Box>
  );
};
export default Sidebar;
