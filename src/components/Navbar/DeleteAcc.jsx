import React, { useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
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

  const handleDelAccount = async (e) => {
    e.preventDefault();
    try {
      let response = await apiManager({
        method: "delete",
        path: "/users/delete",
        params: {
          email: delFormData?.email,
          password: delFormData?.password,
        },
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
        <form>
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
            <Button
              type="submit"
              variant="contained"
              onClick={handleDelAccount}
            >
              Done
            </Button>
          </Stack>
        </form>
      </CustomModal>
    </>
  );
};

export default DeleteAcc;
