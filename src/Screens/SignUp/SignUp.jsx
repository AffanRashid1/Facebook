import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  InputBase,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/facebook.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import apiManager from "../../helper/apiManager";
import { formStyle, inputStyle, signupParaStyle } from "./signupStyle";
import usePageTitle from "../../hooks/usePageTitle";

const SignUp = () => {
  usePageTitle("Sign Up");
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleInputChange(e) {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  }

  const validateFormData = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (
      !formDetails.email.trim() ||
      !formDetails.name.trim() ||
      !formDetails.password.trim()
    ) {
      toast.error("Fill Form");
      return false;
    }

    if (formDetails.password.length < 6) {
      toast.error("Password length must be longer than 6");
      return false;
    }

    if (formDetails.password.length > 20) {
      toast.error("Password length must be shorter than 20");
      return false;
    }

    if (formDetails.name.length < 3) {
      toast.error("Name is too short");
      return false;
    }

    if (formDetails.name.length > 20) {
      toast.error("Name is too long");
      return false;
    }

    if (!nameRegex.test(formDetails.name)) {
      toast.error("Name should only contain Alphabets");
      return false;
    }

    return true;
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      if (!validateFormData()) {
        return;
      }
      setIsLoading(true);
      let response = await apiManager({
        method: "post",
        path: `/users/register`,
        params: formDetails,
      });

      toast.success(response?.data?.message);
      setIsLoading(false);
      navigate("/login");
      setFormDetails({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      {isLoading && (
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
      )}
      <Container maxWidth="100vw" sx={{ bgcolor: "#F0F2F5" }}>
        <Box
          sx={{
            minHeight: "99vh",
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Stack
            direction="column"
            alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
          >
            <img src={logo} width={200} alt="logo" />
            <Typography sx={signupParaStyle}>
              Facebook helps you connect and <br /> share with the people in
              your life.
            </Typography>
          </Stack>
          <Box sx={formStyle}>
            <form
              onSubmit={registerHandler}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Typography textAlign="center" fontSize="26px" fontWeight="bold">
                Lets Get Started
              </Typography>
              <Typography
                textAlign="center"
                fontSize="17px"
                fontWeight="light"
                color="typography.light"
              >
                Create an account
              </Typography>
              <InputBase
                label="Name"
                placeholder="Enter Name"
                color="primary"
                focused
                name="name"
                onChange={handleInputChange}
                value={formDetails.name}
                sx={inputStyle}
                required
              />
              <InputBase
                required
                label="Email"
                placeholder="Enter Email"
                color="primary"
                focused
                name="email"
                onChange={handleInputChange}
                type="email"
                value={formDetails.email}
                sx={inputStyle}
              />
              <InputBase
                label="Password"
                placeholder="Enter Password"
                color="primary"
                focused
                name="password"
                onChange={handleInputChange}
                value={formDetails.password}
                sx={inputStyle}
                type={showPassword ? "text" : "password"}
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
              <Button variant="contained" size="medium" type="submit">
                Sign Up
              </Button>
              <Typography textAlign="center">
                Already have an account ?
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
