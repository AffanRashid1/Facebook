import { Box } from "@mui/material";
import styled from "@emotion/styled";

const addInputStyle = {
  display: "flex",
  alignItems: "center",
  margin: "auto",
  marginBottom: "15px",
  borderRadius: "25px",
  width: "80%",
  backgroundColor: "action.selected",
};

// userBox to display in mobile devices
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
}));
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export { addInputStyle, UserBox, VisuallyHiddenInput };
