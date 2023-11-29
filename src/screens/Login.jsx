import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogged, setUser } from "../store/reducer";
import loginsvg from "../assets/loginsvg.svg";

const Login = () => {
  const isLogged = useSelector((state) => state.appReducer.isLogged);
  const user = useSelector((state) => state.appReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let inputStyle = {
    color: "black",
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "8px 15px",
    margin: "15px 0",
    width: "300px",
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
  const handleLogin = async () => {
    if (loginInput.email == "" || loginInput.password == "") {
      toast.error("Must Fill the Field");
    } else {
      try {
        let resp = await axios.post(
          `${process.env.REACT_APP_API_KEY}/users/login`,
          {
            email: loginInput.email,
            password: loginInput.password,
          },
          {
            withCredentials: true,
          }
        );
        setloginInput({
          email: "",
          password: "",
        });
        dispatch(setLogged());
        dispatch(setUser(resp?.data?.user));

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
            flexDirection: "column",
            justifyContent: "space-evenly",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          <Box>
            <img src={loginsvg} width={300} />
            <Typography
              sx={{
                fontFamily: "monospace",
                textAlign: "center",
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
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "50px 30px",
              borderRadius: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            {/* <Typography
              textAlign={"center"}
              fontSize={"20px"}
              fontWeight={"bold"}
            >
              Login
            </Typography> */}
            <InputBase
              placeholder="Enter Email"
              color="primary"
              focused
              value={loginInput.email}
              onChange={handleInputChange}
              name="email"
              sx={inputStyle}
            />
            <InputBase
              placeholder="Enter Password"
              color="primary"
              focused
              value={loginInput.password}
              onChange={handleInputChange}
              name="password"
              sx={inputStyle}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
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
          </FormControl>
        </Box>
      </Container>
    </>
  );
};
export default Login;
