import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Modal,
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
        path: `/users/update-user`,
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
      <Navbar />
      <Container
        sx={{
          bgcolor: "background.paper",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${"https://imgs.search.brave.com/J-yPqU2rCdwiuszegSxJSxM1S76_lPMFiMab7LLaMDI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE4Mjg5/MzEuanBn"})`,
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundSize: "cover",
            height: { xs: "20vh", sm: "30vh" },
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "13vh", sm: "20vh", md: "22vh" },
            marginLeft: { xs: 0, sm: "60px" },
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: { xs: "10px", sm: "250px" },
            flexDirection: { xs: "column", sm: "row" },
            userSelect: "none",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={4}>
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
            />
            <Typography
              sx={{
                color: "text.primary",
                fontSize: { xs: "25px", sm: "35px" },
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              {user?.name}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              setshowUpdateModal(true);
              setupdateNameInput(user?.name);
              setupdateEmailInput(user?.email);
            }}
          >
            <EditIcon />
            Edit Profile
          </Button>
        </Box>
        <Box sx={{ marginTop: { md: "20%", sm: "20%", xs: "30%" } }}>
          <AddPost post={() => myPosts()} isProfile={isProfile} />
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Card
            sx={{
              borderRadius: "10px",
              padding: "20px",
              position: "sticky",
              top: "10px",
              width: "29%",
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
              Growing one experience at a time ⏲️ Capturing moments 📸
            </Typography>
            <Divider />
            <Stack direction="row" spacing={3} margin="10px 0">
              <HouseIcon sx={{ color: "typography.dark" }} />
              <Typography>Lives in Miami</Typography>
            </Stack>
          </Card>
          <Box width={"67%"}>
            {userPost?.length === undefined || 0 ? (
              <Typography textAlign={"center"}>No Post Yet</Typography>
            ) : (
              userPost
                .map((post, i) => {
                  return (
                    <Post
                      key={i}
                      image={post.imageUrl}
                      date={post.createdAt}
                      description={post.caption}
                      name={user?.name}
                      icon={user?.profile_photo}
                      id={post._id}
                      shareCount="32"
                      likes={post.likes}
                      comment={post.comments}
                      updateProfileData={() => myPosts()}
                      isProfile={isProfile}
                      ownerId={post?.owner?._id}
                    />
                  );
                })
                .reverse()
            )}
          </Box>
        </Stack>
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
