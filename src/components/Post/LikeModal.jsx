import React from "react";
import CustomModal from "../CustomModal/CustomModal";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { Like } from "../../assets/assets";

const LikeModal = ({ likeModal, setLikeModal, data }) => {
  return (
    <>
      <CustomModal
        open={likeModal}
        onClose={() => {
          setLikeModal(false);
        }}
        title={"Like"}
      >
        <Stack spacing={1} direction="row" mb={2}>
          <img src={Like} alt="logo" width={25} />
          <Typography color="typography.dark">{data?.likes?.length}</Typography>
        </Stack>
        <Divider />
        {!data?.likes?.length ? (
          <Typography color="typography.dark" textAlign="center" mt={2}>
            No likes
          </Typography>
        ) : (
          data?.likes.map((liker, i) => {
            return (
              <Box key={i}>
                <Stack
                  direction="row"
                  spacing={3}
                  alignItems="center"
                  margin="10px 0"
                >
                  <Avatar
                    src={liker?.profile_photo}
                    sx={{
                      border: "2px solid transparent",
                      outline: "2px solid grey",
                    }}
                  />
                  <Typography color="typography.dark" fontSize={"20px"}>
                    {liker?.name}
                  </Typography>
                </Stack>
              </Box>
            );
          })
        )}
      </CustomModal>
    </>
  );
};

export default LikeModal;
