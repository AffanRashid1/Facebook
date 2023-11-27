import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/facebook.svg";

const SignUp = () => {
  const [formDetails, setformDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setformDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  }

  const registerHandler = async () => {
    if (
      formDetails.email === "" ||
      formDetails.name === "" ||
      formDetails.password === ""
    ) {
      toast.error("Fill Form");
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
        setformDetails({
          name: "",
          email: "",
          password: "",
        });
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };

  return (
    <>
      <Container
        maxWidth="100vw"
        sx={{
          background:
            "linear-gradient(to top, rgba(255,248,248,1) 0%, rgba(201,209,219,1) 100%, rgba(0,0,0,1) 100%)",
        }}
      >
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
              }}
            >
              Facebook helps you connect and <br /> share with the people in
              your life.
            </Typography>
          </Box>
          <Box
            sx={{
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
            <TextField
              label="Name"
              placeholder="Enter Name"
              color="primary"
              focused
              name="name"
              onChange={handleInputChange}
              value={formDetails.name}
            />
            <TextField
              label="Email"
              placeholder="Enter Email"
              color="primary"
              focused
              name="email"
              onChange={handleInputChange}
              type="email"
              value={formDetails.email}
            />
            <TextField
              label="Password"
              placeholder="Enter Password"
              color="primary"
              focused
              name="password"
              onChange={handleInputChange}
              value={formDetails.password}
            />
            <Button variant="contained" size="medium" onClick={registerHandler}>
              Sign Up
            </Button>
            <Typography>
              Already have an account ?<Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
