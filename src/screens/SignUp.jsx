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
import { TextField } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/facebook.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const [formDetails, setformDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setshowPassword] = useState(false);
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
        axios.defaults.withCredentials = true;
        let resp = await axios.post(
          `${process.env.REACT_APP_API_KEY}/users/register`,
          {
            name: formDetails.name,
            email: formDetails.email,
            password: formDetails.password,
          }
        );
        toast.success(resp.data.message);
        navigate("/login");
        setformDetails({
          name: "",
          email: "",
          password: "",
        });
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
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-evenly",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <Box>
            <img
              src={logo}
              width={200}
              style={{ marginLeft: "20px" }}
              alt="logo"
            />
            <Typography
              sx={{
                fontFamily: "monospace",
                textAlign: "center",
                fontSize: { xs: "1rem", sm: "1.5rem" },
                userSelect: "none",
                textAlign: "left",
                marginLeft: "10px",
                color: "black",
              }}
            >
              Facebook helps you connect and <br /> share with the people in
              your life.
            </Typography>
          </Box>
          <form
            onSubmit={registerHandler}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              padding: "60px 30px",
              borderRadius: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            <Typography
              textAlign={"center"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Sign Up
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
            <Typography>
              Already have an account ?<Link to="/login">Login</Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
