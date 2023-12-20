import React, { useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal/CustomModal";
import { Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiManager from "../../helper/apiManager";
import { setInitialLogged } from "../../store/reducer";

const DeleteAcc = ({ delAccModal, setDelAccModal }) => {
  const [delFormData, setDelFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelInput = (e) => {
    setDelFormData({
      ...delFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validateFormData = () => {
    if (!delFormData?.email.trim() || !delFormData?.password.trim()) {
      toast.error("Fill Form");
      return false;
    }

    if (delFormData?.password.length < 6 || delFormData?.password.length > 20) {
      toast.error("Password length must be between 6 and 20 characters");
      return false;
    }

    return true;
  };

  const handleDelAccount = async (e) => {
    e.preventDefault();
    try {
      if (!validateFormData()) {
        return;
      }
      let response = await apiManager({
        method: "delete",
        path: "/users/delete",
        params: delFormData,
      });
      localStorage.removeItem("token");
      toast.success(response?.data?.message);
      dispatch(setInitialLogged());
      navigate("/login");
    } catch (err) {
      toast?.error(err?.message);
    }
  };

  return (
    <>
      <CustomModal
        open={delAccModal}
        onClose={() => setDelAccModal(false)}
        title="Delete Account"
      >
        <form onSubmit={handleDelAccount}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            sx={{ marginBottom: "20px" }}
            required
            value={delFormData?.email}
            onChange={handleDelInput}
            name="email"
          />
          <TextField
            required
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            value={delFormData?.password}
            onChange={handleDelInput}
            name="password"
          />
          <Stack direction="row" justifyContent="space-between" mt={5}>
            <Button variant="outlined" onClick={() => setDelAccModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Done
            </Button>
          </Stack>
        </form>
      </CustomModal>
    </>
  );
};

export default DeleteAcc;
