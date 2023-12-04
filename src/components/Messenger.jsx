import { Box, Modal } from "@mui/material";
import React from "react";
import Popover from "@mui/material/Popover";

const Messenger = ({ anchorEl, setAnchorEl, messengerOpen, id }) => {
  const style = {
    display: "none",
    position: "absolute",
    top: "80px",
    right: "50px",
    width: 250,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    color: "typography.dark",
  };

  return (
    <>
      <Popover
        open={messengerOpen}
        anchorEl={anchorEl}
        id={id}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        The content of the Popover.
      </Popover>
    </>
  );
};

export default Messenger;
