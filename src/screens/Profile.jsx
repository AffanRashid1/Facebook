import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import apiManager from "../Helper/ApiManager";
import CameraIcon from "@mui/icons-material/Camera";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { PermIdentity, PhotoSizeSelectActual } from "@mui/icons-material";
import styled from "@emotion/styled";

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
  const menuOpen = Boolean(picMenu);

  const myPosts = async () => {
    try {
      let response = await apiManager({
        method: "get",
        path: `/posts/user-post`,
      });
      setuserPost(response?.data?.payload);
    } catch (error) {
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
              backgroundImage: `url(${"https://scontent.flhe20-1.fna.fbcdn.net/v/t39.30808-6/391705295_122106304346078044_9091400103311535031_n.png?_nc_cat=102&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeE1xXErnoP1TjqRaZpQ9P_n7uYIOHBBnRHu5gg4cEGdEXFsxHQHLVbRYAlHvBrxX3mli96IaWaima5TU6joR07-&_nc_ohc=XGnXbACBIXEAX-b4GC5&_nc_oc=AQlgGeqOaDb9ZJHiSrdgxJJ6lYpJ5vbUu6ezy356Jh1mSh4jB0s7ARWIC4l6kuTyBqo&_nc_ht=scontent.flhe20-1.fna&oh=00_AfAAmHRw9lEDUQH8MZRqFEq6LTM-YVAd5TJ8gat7ErOMxw&oe=6578F62E"})`,
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
                <Menu
                  anchorEl={picMenu}
                  open={menuOpen}
                  onClose={() => {
                    setpicMenu(null);
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
                  <MenuItem>
                    <PermIdentity sx={{ margin: "0 5px" }} />
                    Show Profile Picture
                  </MenuItem>
                  <MenuItem>
                    <label
                      htmlFor="profilePictureInput"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ImageIcon sx={{ margin: "0 5px" }} />
                      Update Profile Picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </MenuItem>
                </Menu>

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
                  return postLoading ? (
                    <Box sx={{ marginBottom: "15px" }}>
                      <Skeleton
                        variant="rectangular"
                        height="50vh"
                        animation="wave"
                      />
                    </Box>
                  ) : (
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
        <Box
          sx={{
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
          }}
        >
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
