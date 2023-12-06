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
  Stack,
  Autocomplete,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/logo.png";
import styled from "@emotion/styled";
import MailIcon from "@mui/icons-material/Mail";
import { Notifications } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setInitialLogged } from "../store/reducer";
import { Link } from "react-router-dom";
import apiManager from "../Helper/ApiManager";
import Messenger from "./Messenger";

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
  backgroundColor: "#4E4F50",
  padding: "0 8px",
  borderRadius: "25px",
  width: 250,
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
  bgcolor: "red",
  padding: "8px",
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

  let iconColor = "#2374e1";

  const handleSearch = async () => {
    try {
      let res = await apiManager({
        method: "get",
        path: `/users`,
      });
      setsearchResult(res?.data?.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      toast.success("Logout Successfully");
      dispatch(setInitialLogged());
    } catch (err) {
      toast.error(err?.message);
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
        <Stack spacing={2} direction={"row"} sx={{ alignItems: "center" }}>
          <img src={logo} alt="" width={40} height={40} />
          <Autocomplete
            freeSolo
            disableClearable
            options={searchResult}
            getOptionLabel={(option) => option.name}
            autoHighlight
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{
                  "& > img": { mr: 2, flexShrink: 0 },
                }}
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
            renderInput={(params) => {
              const { InputLabelProps, InputProps, ...rest } = params;
              return (
                <Search>
                  <IconButton>
                    <SearchIcon sx={{ color: "gray" }} />
                  </IconButton>
                  <InputBase
                    {...params.InputProps}
                    {...rest}
                    onChange={(e) => {
                      setsearchField(e.target.value);
                    }}
                    value={searchField}
                    placeholder="Search Facebook"
                    fullWidth
                  />
                </Search>
              );
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent="space-between"
          width="40%"
        >
          <IconButton>
            <svg viewBox="0 0 28 28" fill={iconColor} height="30" width="30">
              <path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path>
            </svg>
          </IconButton>
          <IconButton>
            <svg viewBox="0 0 28 28" fill="currentColor" height="30" width="30">
              <path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.163 11.654C17.612 11.924 17.612 12.575 17.163 12.846ZM21.75 20.25C22.992 20.25 24 19.242 24 18L24 6.5C24 5.258 22.992 4.25 21.75 4.25L6.25 4.25C5.008 4.25 4 5.258 4 6.5L4 18C4 19.242 5.008 20.25 6.25 20.25L21.75 20.25ZM21.75 21.75 6.25 21.75C4.179 21.75 2.5 20.071 2.5 18L2.5 6.5C2.5 4.429 4.179 2.75 6.25 2.75L21.75 2.75C23.821 2.75 25.5 4.429 25.5 6.5L25.5 18C25.5 20.071 23.821 21.75 21.75 21.75Z"></path>
            </svg>
          </IconButton>
          <IconButton>
            <svg
              viewBox="0 0 28 28"
              className="b6ax4al1 m4pnbp5e somyomsx ahndzqod gnhxmgs4"
              fill="currentColor"
              height="28"
              width="28"
            >
              <path d="M17.5 23.75 21.75 23.75C22.164 23.75 22.5 23.414 22.5 23L22.5 14 22.531 14C22.364 13.917 22.206 13.815 22.061 13.694L21.66 13.359C21.567 13.283 21.433 13.283 21.34 13.36L21.176 13.497C20.591 13.983 19.855 14.25 19.095 14.25L18.869 14.25C18.114 14.25 17.382 13.987 16.8 13.506L16.616 13.354C16.523 13.278 16.39 13.278 16.298 13.354L16.113 13.507C15.53 13.987 14.798 14.25 14.044 14.25L13.907 14.25C13.162 14.25 12.439 13.994 11.861 13.525L11.645 13.35C11.552 13.275 11.419 13.276 11.328 13.352L11.155 13.497C10.57 13.984 9.834 14.25 9.074 14.25L8.896 14.25C8.143 14.25 7.414 13.989 6.832 13.511L6.638 13.351C6.545 13.275 6.413 13.275 6.32 13.351L5.849 13.739C5.726 13.84 5.592 13.928 5.452 14L5.5 14 5.5 23C5.5 23.414 5.836 23.75 6.25 23.75L10.5 23.75 10.5 17.5C10.5 16.81 11.06 16.25 11.75 16.25L16.25 16.25C16.94 16.25 17.5 16.81 17.5 17.5L17.5 23.75ZM3.673 8.75 24.327 8.75C24.3 8.66 24.271 8.571 24.238 8.483L23.087 5.355C22.823 4.688 22.178 4.25 21.461 4.25L6.54 4.25C5.822 4.25 5.177 4.688 4.919 5.338L3.762 8.483C3.729 8.571 3.7 8.66 3.673 8.75ZM24.5 10.25 3.5 10.25 3.5 12C3.5 12.414 3.836 12.75 4.25 12.75L4.421 12.75C4.595 12.75 4.763 12.69 4.897 12.58L5.368 12.193C6.013 11.662 6.945 11.662 7.59 12.193L7.784 12.352C8.097 12.609 8.49 12.75 8.896 12.75L9.074 12.75C9.483 12.75 9.88 12.607 10.194 12.345L10.368 12.2C11.01 11.665 11.941 11.659 12.589 12.185L12.805 12.359C13.117 12.612 13.506 12.75 13.907 12.75L14.044 12.75C14.45 12.75 14.844 12.608 15.158 12.35L15.343 12.197C15.989 11.663 16.924 11.663 17.571 12.197L17.755 12.35C18.068 12.608 18.462 12.75 18.869 12.75L19.095 12.75C19.504 12.75 19.901 12.606 20.216 12.344L20.38 12.208C21.028 11.666 21.972 11.666 22.62 12.207L23.022 12.542C23.183 12.676 23.387 12.75 23.598 12.75 24.097 12.75 24.5 12.347 24.5 11.85L24.5 10.25ZM24 14.217 24 23C24 24.243 22.993 25.25 21.75 25.25L6.25 25.25C5.007 25.25 4 24.243 4 23L4 14.236C2.875 14.112 2 13.158 2 12L2 9.951C2 9.272 2.12 8.6 2.354 7.964L3.518 4.802C4.01 3.563 5.207 2.75 6.54 2.75L21.461 2.75C22.793 2.75 23.99 3.563 24.488 4.819L25.646 7.964C25.88 8.6 26 9.272 26 9.951L26 11.85C26 13.039 25.135 14.026 24 14.217ZM16 23.75 16 17.75 12 17.75 12 23.75 16 23.75Z"></path>
            </svg>
          </IconButton>
          <IconButton>
            <svg
              viewBox="0 0 28 28"
              className="b6ax4al1 m4pnbp5e somyomsx ahndzqod gnhxmgs4"
              fill="currentColor"
              height="28"
              width="28"
            >
              <path d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.274 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.878 19L21.364 19C21.139 19 20.97 18.802 20.997 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.667 15.491 20.067 14.591 19.899 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.441 13.5 12.828 13.5L15.172 13.5ZM16.75 9C16.75 10.655 15.517 12 14 12 12.484 12 11.25 10.655 11.25 9 11.25 7.15 12.304 6 14 6 15.697 6 16.75 7.15 16.75 9Z"></path>
            </svg>
          </IconButton>
          <IconButton>
            <svg
              viewBox="0 0 28 28"
              className="b6ax4al1 m4pnbp5e somyomsx ahndzqod gnhxmgs4"
              fill="currentColor"
              height="28"
              width="28"
            >
              <path d="M23.5 9.5H10.25a.75.75 0 00-.75.75v7c0 .414.336.75.75.75H17v5.5H4.5v-19h19v5zm0 14h-5v-6.25a.75.75 0 00-.75-.75H11V11h12.5v12.5zm1.5.25V4.25C25 3.561 24.439 3 23.75 3H4.25C3.561 3 3 3.561 3 4.25v19.5c0 .689.561 1.25 1.25 1.25h19.5c.689 0 1.25-.561 1.25-1.25z"></path>
            </svg>
          </IconButton>
        </Stack>
        <Icons>
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
                border: "2px solid grey",
              }}
              src={user?.profile_photo}
            ></Avatar>
            <Typography textTransform={"capitalize"} color="text.primary">
              {user?.name}
            </Typography>
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
      <Messenger />
    </AppBar>
  );
};
export default Navbar;
