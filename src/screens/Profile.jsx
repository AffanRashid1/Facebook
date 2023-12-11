import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import apiManager from "../Helper/ApiManager";
import CameraIcon from "@mui/icons-material/Camera";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import CloseIcon from "@mui/icons-material/Close";
import ProfilePicMenu from "../components/ProfilePicMenu";

const Profile = () => {
  const user = useSelector((state) => state.appReducer.user);
  const [userPost, setuserPost] = useState([]);
  const [isProfile, setisProfile] = useState(true);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [profilePic, setprofilePic] = useState(null);
  const [updateNameInput, setupdateNameInput] = useState("");
  const [updateEmailInput, setupdateEmailInput] = useState("");
  const [imgPreview, setimgPreview] = useState(null);
  const [loadingUpdateBtn, setloadingUpdateBtn] = useState(false);
  const [postLoading, setpostLoading] = useState(false);
  const [picMenu, setpicMenu] = useState(null);

  const myPosts = async () => {
    setpostLoading(true);
    try {
      let response = await apiManager({
        method: "get",
        path: `/posts/user-post`,
      });
      setuserPost(response?.data?.payload);
      // setpostLoading(false);
    } catch (error) {
      // setpostLoading(false);
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      setloadingUpdateBtn(true);
      let formData = new FormData();
      formData.append("profile_photo", profilePic);
      formData.append("name", updateNameInput);
      formData.append("email", updateEmailInput);

      let response = await apiManager({
        method: "put",
        path: `/users/updateUser`,
        params: formData,
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      setimgPreview(null);
      setshowUpdateModal(false);

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.message);
      setloadingUpdateBtn(false);
    } finally {
      setloadingUpdateBtn(false);
    }
  };

  useEffect(() => {
    if (profilePic) {
      setimgPreview(URL.createObjectURL(profilePic));
    }
  }, [profilePic]);

  useEffect(() => {
    myPosts();
  }, []);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    borderRadius: "10px",
    pb: 3,
    color: "action.selected",
  };

  return (
    <>
      <Container
        sx={{
          bgcolor: "background.paper",
          minHeight: "100vh",
        }}
      >
        <Box mb={8}>
          <Navbar />
        </Box>
        <Box>
          <Box
            sx={{
              backgroundImage: `url(${
                user?.cover_photo[user?.cover_photo?.length - 1]
              })`,
              // backgroundImage: `url(${"https://imgs.search.brave.com/nJz_Nq_HMMszATPGnL9H0ZPw-5mDLDqvnBfJp9bhlno/rs:fit:860:0:0/g:ce/aHR0cHM6Ly92aXNt/ZS5jby9ibG9nL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIwLzA5/L0hlYWRlci0xLTEu/cG5n"})`,
              backgroundRepeat: "no-repeat",
              width: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "25vh",
            }}
            mb={{ xs: 30, md: 20 }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              spacing={5}
              justifyContent="space-between"
              sx={{
                position: "relative",
                top: "19vh",
                padding: "0 20px",
                zIndex: 5,
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                spacing={3}
              >
                <Avatar
                  sx={{
                    width: "200px",
                    height: "200px",
                    padding: 0,
                    margin: 0,
                    borderRadius: "50%",
                    border: "5px solid grey",
                    outline: "3px solid white",
                  }}
                  src={user?.profile_photo[user?.profile_photo.length - 1]}
                  alt="A"
                  onClick={(event) => {
                    setpicMenu(event.currentTarget);
                  }}
                />
                {/* profile pic menu  */}
                <ProfilePicMenu
                  picMenu={picMenu}
                  setpicMenu={() => {
                    setpicMenu();
                  }}
                  modalStyle={modalStyle}
                />

                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "30px", sm: "35px" },
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                >
                  {user?.name}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Grid container spacing={2} xs={12} mt={2}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: "10px",
                padding: "20px",
                position: "sticky",
                top: "70px",
                maxHeight: "70vh",
              }}
            >
              <Typography
                color="typography.dark"
                fontWeight="bold"
                fontSize="25px"
                letterSpacing="4"
              >
                Intro
              </Typography>
              <Typography
                textAlign="center"
                color="typography.dark"
                margin="15px 0"
              >
                Growing one experience at a time ⏲️ <br /> Capturing moments 📸
              </Typography>
              <Divider />
              <Stack direction="row" spacing={3} margin="10px 0">
                <HouseIcon sx={{ color: "typography.dark" }} />
                <Typography>Lives in Miami</Typography>
              </Stack>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setshowUpdateModal(true);
                  setupdateNameInput(user?.name);
                  setupdateEmailInput(user?.email);
                }}
                sx={{
                  bgcolor: "action.selected",
                }}
              >
                <EditIcon />
                Edit Profile
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <AddPost post={() => myPosts()} isProfile={isProfile} />
            <Box>
              {userPost?.length === undefined || 0 ? (
                <Typography textAlign={"center"}>No Post Yet</Typography>
              ) : (
                userPost.map((post, i) => {
                  return (
                    <Post
                      key={i}
                      data={post}
                      updateProfileData={() => myPosts()}
                      isProfile={isProfile}
                    />
                  );
                })
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Update Modal */}
      <Modal
        open={showUpdateModal}
        onClose={() => {
          setshowUpdateModal(false);
          setimgPreview(null);
        }}
        disableAutoFocus
      >
        <Box sx={modalStyle}>
          <FormControl fullWidth sx={{ display: "flex", gap: "20px" }}>
            <TextField
              type="text"
              label="Name"
              fullWidth
              variant="standard"
              value={updateNameInput}
              onChange={(e) => {
                setupdateNameInput(e.target.value);
              }}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={updateEmailInput}
              onChange={(e) => {
                setupdateEmailInput(e.target.value);
              }}
            />
            <Button component="label" variant="contained">
              <CameraIcon /> Add Profile Pic
              <input
                filename={profilePic}
                type="file"
                onChange={(e) => setprofilePic(e.target.files[0])}
                accept="image/*"
                style={{
                  clip: "rect(0 0 0 0)",
                  clipPath: "inset(50%)",
                  height: 1,
                  overflow: "hidden",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  whiteSpace: "nowrap",
                  width: 1,
                }}
              />
            </Button>
            {imgPreview !== null ? (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <img
                  src={imgPreview}
                  alt=""
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </Box>
            ) : (
              ""
            )}
            <LoadingButton
              loading={loadingUpdateBtn}
              variant="contained"
              fullWidth
              onClick={updateProfile}
            >
              UPDATE
            </LoadingButton>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
