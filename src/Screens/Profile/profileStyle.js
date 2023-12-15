const AvatarStyle = {
  width: "200px",
  height: "200px",
  padding: 0,
  margin: 0,
  borderRadius: "50%",
  border: "5px solid grey",
  cursor: "pointer",
  outline: "3px solid white",
  bgcolor: "gray",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    opacity: "0.8",
  },
};

const UploadInputStyle = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  borderRadius: "10px",
  pb: 3,
  color: "action.selected",
};

export { UploadInputStyle, AvatarStyle, modalStyle };
