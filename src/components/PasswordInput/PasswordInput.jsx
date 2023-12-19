import React, { useState } from "react";
import { IconButton, InputAdornment, InputBase } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { inputStyle } from "../../screens/SignUp/signupStyle";

const PasswordInput = ({ onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputBase
        label="Password"
        placeholder="Enter Password"
        color="primary"
        required
        focused
        sx={inputStyle}
        name="password"
        onChange={onChange}
        value={value}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
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
    </>
  );
};

export default PasswordInput;
