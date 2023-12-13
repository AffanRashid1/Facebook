import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogged, setUser } from "../store/reducer";
import loginsvg from "../assets/loginsvg.svg";
import apiManager from "../helper/apiManager";
import usePageTitle from "../hooks/usePageTitle";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  usePageTitle("Login");

  let inputStyle = {
    color: "black",
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "8px 15px",
    margin: "15px 0",
  };

  const handleInputChange = (e) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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

        localStorage.setItem("token", resp?.data?.payload?.token);

        setLoginInput({
          email: "",
          password: "",
        });
        dispatch(setLogged());
        dispatch(setUser(resp?.data?.payload?.user));
        setIsLoading(false);
        toast.success(resp?.data?.message);
        navigate("/");
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.response?.data?.message);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <LinearProgress />
        </Box>
      ) : null}
      <Container maxWidth="100vw" sx={{ bgcolor: "#F0F2F5" }}>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: { xs: "column", sm: "column", md: "row" },
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
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              Facebook helps you connect and <br /> share with the people in
              your life.
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: {
                xs: "unset",
                sm: "unset",
                md: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              },
              borderRadius: "10px",
              padding: { xs: "0", sm: "0", md: "60px 30px" },
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onSubmit={handleLogin}
            >
              <Typography
                textAlign="center"
                fontSize="26px"
                fontWeight="bold"
                margin="10px 0"
              >
                Welcome Back!
              </Typography>
              <Typography
                textAlign="center"
                fontSize="17px"
                fontWeight="light"
                color="typography.light"
                margin="10px 0"
              >
                Login to your Account
              </Typography>
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
                        setShowPassword(!showPassword);
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
        </Box>
      </Container>
    </>
  );
};
export default Login;
