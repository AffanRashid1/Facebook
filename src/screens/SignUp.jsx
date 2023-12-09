import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  InputBase,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/facebook.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import apiManager from "../Helper/ApiManager";

const SignUp = () => {
  const [formDetails, setformDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setshowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  function handleInputChange(e) {
    setformDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  }

  let inputStyle = {
    color: "black",
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "8px 15px",
    margin: "8px 0",
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    if (
      formDetails.email === "" ||
      formDetails.name === "" ||
      formDetails.password === ""
    ) {
      toast.error("Fill Form");
    } else if (formDetails.password.length < 6) {
      toast.error("Password length must be longer than 6");
    } else if (formDetails.password.length > 20) {
      toast.error("Password length must be shorter than 20");
    } else if (formDetails.name.length < 3) {
      toast.error("Name is too short");
    } else if (formDetails.name.length > 20) {
      toast.error("Name is too long");
    } else {
      try {
        let response = await apiManager({
          method: "post",
          path: `/users/register`,
          params: {
            name: formDetails.name,
            email: formDetails.email,
            password: formDetails.password,
          },
        });

        toast.success(response?.data?.message);
        setisLoading(false);
        navigate("/login");
        setformDetails({
          name: "",
          email: "",
          password: "",
        });
      } catch (err) {
        setisLoading(false);
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
            minHeight: "99vh",
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "center", md: "flex-start" },
            }}
          >
            <img src={logo} width={200} alt="logo" />
            <Typography
              sx={{
                fontFamily: "monospace",
                textAlign: "center",
                fontSize: { xs: "1rem", sm: "1.5rem" },
                userSelect: "none",
                textAlign: "left",
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
                        setshowPassword(!showPassword);
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
