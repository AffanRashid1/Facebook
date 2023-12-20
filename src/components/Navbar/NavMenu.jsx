import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { toast } from "react-toastify";
import apiManager from "../../helper/apiManager";
import { setInitialLogged } from "../../store/reducer";
import DeleteAcc from "./DeleteAcc";
import { useState } from "react";

const NavMenu = ({ setLogoutLoading, open, setOpen }) => {
  const user = useSelector((state) => state.appReducer.user);
  const [delAccModal, setDelAccModal] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      let response = await apiManager({
        method: "post",
        path: `/users/logout`,
      });
      localStorage.removeItem("token");
      toast.success("Logout Successfully");
      dispatch(setInitialLogged());
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
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

      <DeleteAcc {...{ delAccModal, setDelAccModal }} />
    </>
  );
};

export default NavMenu;
