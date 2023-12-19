import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputBase,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/facebook.svg";
import apiManager from "../../helper/apiManager";
import { formStyle, inputStyle, signupParaStyle } from "./signupStyle";
import usePageTitle from "../../hooks/usePageTitle";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import LinearProgressBar from "../../components/LinearProgressBar/LinearProgressBar";

const SignUp = () => {
  usePageTitle("Sign Up");
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      toast.error("Must fill the fields");
      return false;
    }

    if (formDetails?.password.length < 6 || formDetails?.password.length > 20) {
      toast.error("Password length must be between 6 and 20 characters");
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
      <LinearProgressBar isLoading={isLoading} />
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
              <PasswordInput
                onChange={handleInputChange}
                value={formDetails.password}
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
