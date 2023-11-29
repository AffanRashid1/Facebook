import styled from "@emotion/styled";
import {
  Avatar,
  AvatarGroup,
  Box,
  ImageList,
  ImageListItem,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { contacts } from "../Data/data";

const RightBox = styled(Box)({
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
});

const Rightbar = () => {
  return (
    <Box
      flex={1}
      p={2}
      mb={5}
      sx={{
        display: { xs: "none", md: "flex" },
      }}
    >
      <Box
        className="rightScroll"
        sx={{
          position: "fixed",
          top: "70px", // Adjust the top position based on your layout,
          maxHeight: "calc(100vh - 70px)", // Adjust based on your layout
          overflowY: "auto",
        }}
      >
        <RightBox>
          <Typography variant="p" fontWeight={500} mt={2} mb={2}>
            Contacts
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: "1rem",
            }}
          >
            <VideoCallIcon sx={{ color: "#999", fontSize: "25px" }} />
            <SearchIcon sx={{ color: "#999", fontSize: "25px" }} />
            <MoreHorizIcon sx={{ color: "#999", fontSize: "25px" }} />
          </Box>
        </RightBox>
        {contacts.map((contact, index) => {
          return (
            <ListItem disablePadding key={contact.id}>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: "25px",
                      height: "25px",
                      border: "3px solid #1DA1F2",
                    }}
                    src={contact.image}
                  />
                </ListItemIcon>
                <ListItemText primary={contact.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="div" fontWeight={500} mt={2} mb={2}>
            Group Conversations
          </Typography>
          <AvatarGroup max={4} sx={{ marginTop: "20px", width: "200px" }}>
            <Avatar
              alt="Remy Sharp"
              src="https://random.imagecdn.app/500/150"
            />
            <Avatar
              alt="Travis Howard"
              src="https://random.imagecdn.app/500/151"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://random.imagecdn.app/500/152"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://random.imagecdn.app/500/153"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://random.imagecdn.app/500/154"
            />
          </AvatarGroup>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <AddCircleOutlineIcon
                  sx={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Add New Group" />
            </ListItemButton>
          </ListItem>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h6" fontSize={16} fontWeight={500} mt={2} mb={2}>
            Latest Photos
          </Typography>
          <ImageList cols={3} gap={5} rowHeight={100} mt={2}>
            <ImageListItem>
              <img src="https://random.imagecdn.app/500/154" />
            </ImageListItem>
            <ImageListItem>
              <img src="https://random.imagecdn.app/500/156" />
            </ImageListItem>
            <ImageListItem>
              <img src="https://random.imagecdn.app/500/158" />
            </ImageListItem>
          </ImageList>
        </Box>
      </Box>
    </Box>
  );
};
export default Rightbar;
