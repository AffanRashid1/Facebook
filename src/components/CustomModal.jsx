import React from "react";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({ open, onClose, title, children }) => {
  return (
    <Modal
      sx={{ outline: "none" }}
      open={open}
      onClose={onClose}
      disableAutoFocus
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <Stack justifyContent="center">
          <CloseIcon
            sx={{
              color: "black",
              width: "100%",
              marginLeft: "45%",
              color: "typography.dark",
            }}
            onClick={(e) => {
              onClose();
            }}
          />
          <Typography
            variant="h6"
            color="typography.dark"
            textAlign="center"
            margin="7px 0"
          >
            {title}
          </Typography>
          <Box>{children}</Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomModal;
