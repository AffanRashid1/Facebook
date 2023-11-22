import { Home, Settings } from "@mui/icons-material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AppsIcon from "@mui/icons-material/Apps";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import GroupsIcon from "@mui/icons-material/Groups";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Switch,
} from "@mui/material";

import avatar from "../assets/avatar.jpg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state) => state.appReducer.user);

  return (
    <Box
      flex={1.5}
      p={2}
      sx={{ display: { xs: "none", sm: "block" }, paddingTop: "84px" }}
    >
      <Box position={"fixed"}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home sx={{ color: "#1DA1F2", fontSize: "25px" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: "30px",
                      height: "30px",
                      border: "2px solid transparent",
                      outline: "2px solid grey",
                    }}
                    src={user.profile_photo}
                  ></Avatar>
                </ListItemIcon>
                <ListItemText primary={user?.name} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider variant="fullWidth" />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#video">
              <ListItemIcon>
                <LiveTvIcon sx={{ color: "#1DA1F2", fontSize: "25px" }} />
              </ListItemIcon>
              <ListItemText primary="Video" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#marketPlace">
              <ListItemIcon>
                <StorefrontIcon sx={{ color: "#1DA1F2", fontSize: "25px" }} />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#gaming">
              <ListItemIcon>
                <SportsEsportsIcon
                  sx={{ color: "#1DA1F2", fontSize: "25px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Gaming" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#settings">
              <ListItemIcon>
                <Settings sx={{ color: "#1DA1F2", fontSize: "25px" }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#groups">
              <ListItemIcon>
                <GroupsIcon sx={{ color: "#1DA1F2", fontSize: "25px" }} />
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

          <Divider variant="fullWidth" />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Brightness4Icon sx={{ color: "#999", fontSize: "25px" }} />
              </ListItemIcon>
              {/* <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              /> */}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
export default Sidebar;
