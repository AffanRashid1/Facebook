import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogged, setUser } from "../store/reducer";
import loginsvg from "../assets/loginsvg.svg";
import apiManager from "../Helper/ApiManager";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);

  let inputStyle = {
    color: "black",
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "8px 15px",
    margin: "15px 0",
  };

  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setloginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInput.email === "" || loginInput.password === "") {
      toast.error("Must Fill the Field");
    } else {
      try {
        let resp = await apiManager({
          method: "post",
          path: `/users/login`,
          params: {
            email: loginInput.email,
            password: loginInput.password,
          },
        });
        console.log(
          "🚀 ~ file: Login.jsx:54 ~ handleLogin ~ resp:",
          resp?.data?.payload?.user
        );

        localStorage.setItem("token", resp?.data?.payload?.token);

        setloginInput({
          email: "",
          password: "",
        });
        dispatch(setLogged());
        dispatch(setUser(resp?.data?.payload?.user));

        toast.success(resp?.data?.message);
        navigate("/");
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
  };
  return (
    <>
      <Container maxWidth="100vw" sx={{ bgcolor: "white" }}>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          <Box>
            <img src={loginsvg} width={300} alt="svg" />
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "1rem", sm: "1.5rem" },
                userSelect: "none",
                textAlign: "left",
                marginLeft: "25px",
                color: "black",
              }}
            >
              Facebook helps you connect and <br /> share with the people in
              your life.
            </Typography>
          </Box>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "50px 30px",
              borderRadius: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
            onSubmit={handleLogin}
          >
            <InputBase
              placeholder="Enter Email"
              color="primary"
              focused
              value={loginInput.email}
              onChange={handleInputChange}
              name="email"
              sx={inputStyle}
              type="email"
              required
            />
            <InputBase
              placeholder="Enter Password"
              focused
              value={loginInput.password}
              onChange={handleInputChange}
              name="password"
              sx={inputStyle}
              type={showPassword ? "text" : "password"}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setshowPassword(!showPassword);
                    }}
                    sx={{ color: "black" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ bgcolor: "#1877F2", color: "white", margin: "10px 0" }}
            >
              Login
            </Button>
            <hr
              style={{ bgcolor: "grey", width: "80%", margin: "10px auto" }}
            />
            <Button
              variant="contained"
              size="large"
              color="success"
              onClick={() => {
                navigate("/register");
              }}
              sx={{ bgcolor: "#42B72A", color: "white", margin: "10px 0" }}
            >
              Create New Account
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};
export default Login;
