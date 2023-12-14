import { Box, Modal, Toolbar } from "@mui/material";
import styled from "@emotion/styled";

//Creating custom components
const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#4E4F50",
  padding: "5px 7px",
  borderRadius: "25px",
  width: 250,
}));

// icons container box means div
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
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

export { Search, Icons, IconsBorder, UserBox };
