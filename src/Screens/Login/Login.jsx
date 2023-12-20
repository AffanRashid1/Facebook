import { Box, Button, Container, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogged, setUser } from "../../store/reducer";
import { LoginSvg } from "../../assets/assets";
import apiManager from "../../helper/apiManager";
import usePageTitle from "../../hooks/usePageTitle";
import {
  containerStyle,
  inputStyle,
  loginForm,
  loginParaStyle,
} from "./loginStyle";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import LinearProgressBar from "../../components/LinearProgressBar/LinearProgressBar";

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

  const handleInputChange = (e) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const validateFormData = () => {
    if (!loginInput.email.trim() || !loginInput.password.trim()) {
      toast.error("Must fill the fields");
      return false;
    }

    if (loginInput.password.length < 6) {
      toast.error("Password length must be longer than 6");
      return false;
    }

    if (loginInput?.password.length < 6 || loginInput?.password.length > 20) {
      toast.error("Password length must be between 6 and 20 characters");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!validateFormData()) {
        return;
      }

      setIsLoading(true);
      let resp = await apiManager({
        method: "post",
        path: `/users/login`,
        params: {
          email: loginInput.email,
          password: loginInput.password,
        },
      });

      localStorage.setItem("token", resp?.data?.payload?.token);

      setLoginInput({});
      dispatch(setLogged());
      dispatch(setUser(resp?.data?.payload?.user));
      toast.success(resp?.data?.message);
      navigate("/");
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <LinearProgressBar isLoading={isLoading} />

      <Container maxWidth="100vw" sx={{ bgcolor: "#F0F2F5" }}>
        <Box sx={containerStyle}>
          <Box>
            <img src={LoginSvg} width={300} alt="svg" />
            <Typography sx={loginParaStyle}>
              Facebook helps you connect and <br /> share with the people in
              your life.
            </Typography>
          </Box>
          <Box sx={loginForm}>
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
              <PasswordInput
                value={loginInput.password}
                onChange={handleInputChange}
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
