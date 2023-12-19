import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setInitialLogged } from "../../store/reducer";
import { setAllUser } from "../../store/reducer";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Autocomplete,
  LinearProgress,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Notifications } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Search, Icons, IconsBorder, UserBox } from "./navbarStyles";
import apiManager from "../../helper/apiManager";
import { logo } from "../../assets/assets";
import { Friends, Home, Marketplace, Videos, Games } from "../../assets/assets";
import DeleteAcc from "./DeleteAcc";
import LinearProgressBar from "../LinearProgressBar/LinearProgressBar";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.appReducer.user);
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [delAccModal, setDelAccModal] = useState(false);

  const handleSearch = async () => {
    try {
      let res = await apiManager({
        method: "get",
        path: `/users`,
      });
      dispatch(setAllUser(res?.data?.payload));
      setSearchResult(res?.data?.payload);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      let response = await apiManager({
        method: "post",
        path: `/users/logout`,
      });
      localStorage.removeItem("token");
      toast.success("Logout Successfully");
      setLogoutLoading(false);
      dispatch(setInitialLogged());
    } catch (err) {
      setLogoutLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          marginBottom: "150px",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <LinearProgressBar isLoading={logoutLoading} />
        <Stack direction="row" justifyContent="space-between" padding="0 12px">
          <Stack spacing={3} direction={"row"} sx={{ alignItems: "center" }}>
            <Link to="/">
              <img src={logo} alt="" width={40} height={40} />
            </Link>
            <Autocomplete
              freeSolo
              disableClearable
              clearOnBlur
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
                    <SearchIcon sx={{ color: "gray" }} />
                    <InputBase
                      {...params.InputProps}
                      {...rest}
                      onChange={(e) => {
                        setSearchField(e.target.value);
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
        </Stack>
        <Menu
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
          <MenuItem color="red" onClick={() => setDelAccModal(true)}>
            <RemoveCircleOutlineIcon
              sx={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
                color: "red",
              }}
            />
            <Typography color="red">Delete Account</Typography>
          </MenuItem>
        </Menu>
      </AppBar>

      {/* Delete Modal  */}

      <DeleteAcc delAccModal={delAccModal} setDelAccModal={setDelAccModal} />
    </>
  );
};
export default Navbar;
