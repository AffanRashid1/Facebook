import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Stack } from "@mui/material";
import LinearProgressBar from "../LinearProgressBar/LinearProgressBar";
import NavMenu from "./NavMenu";
import NavLeft from "./NavLeft";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";

const Navbar = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <LinearProgressBar isLoading={logoutLoading} />
        <Stack direction="row" justifyContent="space-between" padding="0 12px">
          <NavLeft />
          <NavCenter />
          <NavRight setLogoutLoading={setLogoutLoading} />
        </Stack>
      </AppBar>
    </>
  );
};
export default Navbar;
