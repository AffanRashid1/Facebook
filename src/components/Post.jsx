import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
  Modal,
  Box,
  ButtonGroup,
  Button,
  Skeleton,
  Divider,
  TextField,
  InputBase,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

const Post = ({
  image,
  date,
  description,
  name,
  icon,
  id,
  shareCount,
  likes,
  comment,
  updateProfileData,
  allPosts,
}) => {
  const [modal, setmodal] = useState(false);
  const [loading, setloading] = useState(true);
  const user = useSelector((state) => state.appReducer.user);

  const handleProfileLikeClick = async (postId, liked) => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/posts/like/${postId}`
      );
      updateProfileData();
      // let liker = allPosts.find((post) => post?.data?.likerId);
    } catch (error) {
      console.log(error);
    }

    // if (liked) {
    //   dispatch(removeLike(postIndex));
    // } else {
    //   dispatch(addLike(postIndex));
    // }
  };

  const deletepost = async () => {
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_API_KEY}/posts/delete-post/${id}`
      );
      setmodal(false);
      updateProfileData();
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  });

  return (
    <>
      <Card key={id} sx={{ marginBottom: "20px" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "red" }} src={icon} />}
          action={
            <IconButton
              onClick={() => {
                setmodal(true);
              }}
            >
              <MoreHorizIcon />
              {/* <CloseIcon /> */}
            </IconButton>
          }
          title={name}
          subheader={date}
        />
        <CardContent>
          <Typography variant="body2" color="black">
            {description}
          </Typography>
        </CardContent>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={450}
            animation="wave"
          />
        ) : (
          <CardMedia component="img" height="auto%" image={image} alt="Post" />
        )}
        {/* Buttons */}
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button
            aria-label="add to favorites"
            onClick={() => handleProfileLikeClick(id, likes)}
            startIcon={<ThumbUpOffAltIcon />}
          >
            {/* <Checkbox
              // label="236 likes"
              icon={<ThumbUpOffAltIcon />}
              checkedIcon={<ThumbUpAltIcon />}
            /> */}
            <Typography variant="small" sx={{ fontSize: "16px" }}>
              {likes} Likes
            </Typography>
          </Button>

          <IconButton
            aria-label="share"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ChatBubbleOutlineIcon />
            <Typography
              variant="small"
              sx={{ fontSize: "16px", marginLeft: "8px" }}
            >
              {comment} Comments
            </Typography>
          </IconButton>
          <IconButton aria-label="share">
            <ReplyIcon />
            <Typography
              variant="small"
              sx={{ fontSize: "16px", marginLeft: "8px" }}
            >
              {shareCount} shares
            </Typography>
          </IconButton>
        </CardActions>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
          }}
        >
          <Avatar src={user?.profile_photo} />
          <InputBase
            placeholder="Submit Your Comment"
            fullWidth
            sx={{ margin: "0 10px" }}
          />
          <SendIcon sx={{ color: "#1877F2" }} />
        </Box>
      </Card>

      <Modal
        open={modal}
        onClose={() => {
          setmodal(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button onClick={deletepost}>Delete</Button>
        </Box>
      </Modal>
    </>
  );
};
export default Post;
