let inputStyle = {
  color: "black",
  border: "1px solid grey",
  borderRadius: "5px",
  padding: "8px 15px",
  margin: "15px 0",
};

let loginForm = {
  boxShadow: {
    xs: "unset",
    sm: "unset",
    md: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  },
  borderRadius: "10px",
  padding: { xs: "0", sm: "0", md: "60px 30px" },
};

let containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: { xs: "column", sm: "column", md: "row" },
  alignItems: "center",
};

let loginParaStyle = {
  fontFamily: "monospace",
  fontSize: { xs: "1rem", sm: "1.5rem" },
  userSelect: "none",
  textAlign: "left",
  marginLeft: "25px",
  color: "black",
  display: { xs: "none", sm: "none", md: "block" },
};

export { inputStyle, loginForm, containerStyle, loginParaStyle };
