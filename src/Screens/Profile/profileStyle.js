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

export { UploadInputStyle, AvatarStyle };
