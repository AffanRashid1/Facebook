import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Modal,
  Button,
  Stack,
  Autocomplete,
  TextField,
  Input,
  Skeleton,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/facebook.svg";
import styled from "@emotion/styled";
import MailIcon from "@mui/icons-material/Mail";
import { Height, Notifications } from "@mui/icons-material";
import avatar from "../assets/avatar.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setInitialLogged } from "../store/reducer";
import { Link } from "react-router-dom";

// Toolbar to hold logo search and icons
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  margin: "0 15px",
  alignItems: "center",
});

//Creating custom components
const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F0F0F0",
  padding: "0 8px",
  borderRadius: "25px",
  width: "40%",
}));

// icons container box means div
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

// border for icons
const IconsBorder = styled(Box)({
  backgroundColor: "#F0F0F5",
  padding: "10px",
  borderRadius: "50%",
});

// userBox to display in mobile devices
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.appReducer.user);
  const [open, setOpen] = useState(false);
  const [searchResult, setsearchResult] = useState([]);
  const [searchField, setsearchField] = useState("");

  const handleSearch = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_KEY}/users`);
      // console.log(res?.data?.User);
      setsearchResult(res?.data?.User);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      let response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/users/logout`
      );
      toast.success(response?.data?.message);
      dispatch(setInitialLogged());
    } catch (err) {
      console.log("🚀 ~ file: Navbar.jsx:26 ~ logoutHandler ~ err:", err);
    }
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        marginBottom: "150px",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <StyledToolbar>
        <img src={logo} alt="" />
        <Stack spacing={2} sx={{ width: 500 }}>
          <Autocomplete
            freeSolo
            disableClearable
            id="free-solo-2-demo"
            options={searchResult}
            getOptionLabel={(option) => option.name}
            autoHighlight
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Avatar
                  sx={{ margin: "0 10px" }}
                  loading="lazy"
                  width="10"
                  src={`${option?.profile_photo}`}
                  alt=""
                />

                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <>
                {/* <IconButton>
                  <SearchIcon sx={{ color: "gray" }} />
                </IconButton> */}
                <TextField
                  {...params}
                  // label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  onChange={(e) => {
                    setsearchField(e.target.value);
                  }}
                  value={searchField}
                />
              </>
            )}
          />
        </Stack>
        {/* <Search>
          <IconButton>
            <SearchIcon sx={{ color: "gray" }} />
          </IconButton>
          <InputBase
            placeholder="Search Facebook..."
            sx={{ width: { xs: "50%", md: "100%", color: "black" } }}
            onChange={(e) => {
              setsearchField(e.target.value);
              handleSearch();
            }}
            value={searchField}
          />
        </Search> */}
        <Icons>
          <IconsBorder>
            <Badge badgeContent={4} color="error">
              <MailIcon sx={{ color: "black" }} />
            </Badge>
          </IconsBorder>
          <IconsBorder>
            <Badge badgeContent={9} color="error">
              <Notifications sx={{ color: "black" }} />
            </Badge>
          </IconsBorder>

          <Avatar
            sx={{
              width: "35px",
              height: "35px",
              border: "2px solid transparent",
              outline: "2px solid grey",
            }}
            src={user?.profile_photo}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox>
          <Avatar
            sx={{ width: "35px", height: "35px" }}
            src={user?.profile_photo}
            onClick={(e) => setOpen(true)}
          />
          <Typography variant="span">{user?.name}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <Link
            to="/profile"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
                border: "2px solid black",
              }}
              src={user?.profile_photo}
            ></Avatar>
            <Typography textTransform={"capitalize"}>{user?.name}</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Settings
            sx={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          <Typography>Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon
            sx={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
export default Navbar;
