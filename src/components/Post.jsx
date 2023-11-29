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
  Button,
  Skeleton,
  Divider,
  InputBase,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";

const Post = ({
  image,
  createdAt,
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
  const [commentInput, setcommentInput] = useState("");
  const [timeAgo, setTimeAgo] = useState("");

  const handleProfileLikeClick = async (postId, liked) => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/posts/like/${postId}`
      );

      // updateProfileData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      if (commentInput != "") {
        let res = await axios.post(
          `${process.env.REACT_APP_API_KEY}/posts/comment`,
          {
            id: id,
            comment: commentInput,
          }
        );
        comment.push(res?.data?.newComment);
        setcommentInput("");
      }
    } catch (err) {
      console.log(err);
    }
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
    setloading(false);
    const updateRelativeTime = () => {
      const now = moment();
      const postTime = moment(createdAt);
      const diffInMinutes = now.diff(postTime, "minutes");

      if (diffInMinutes < 1) {
        setTimeAgo("Just Now");
      } else if (diffInMinutes < 60) {
        setTimeAgo(`${diffInMinutes} minutes ago`);
      } else {
        setTimeAgo(postTime.fromNow());
      }
    };

    updateRelativeTime();

    const intervalId = setInterval(updateRelativeTime, 60000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  return (
    <>
      <Card key={id} sx={{ marginBottom: "20px", borderRadius: "10px" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "gray" }} src={icon} />}
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
          subheader={timeAgo}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
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
              Comments
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
        {comment?.map((comment) => {
          return (
            <Stack
              direction={"row"}
              spacing={3}
              alignItems={"center"}
              margin={"8px 10px"}
            >
              <Avatar sx={{ height: "20px", width: "20px" }} />
              <Box
                sx={{
                  // backgroundColor: "#F0F2F6",
                  bgcolor: "action.selected",
                  borderRadius: "5px",
                  padding: "5px 8px",
                }}
              >
                <Typography fontSize={"14px"}>{comment?.comment}</Typography>
              </Box>
            </Stack>
          );
        })}
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
            value={commentInput}
            onChange={(e) => {
              setcommentInput(e.target.value);
            }}
            error={true}
          />
          <IconButton onClick={handleComment}>
            <SendIcon sx={{ color: "#1877F2" }} />
          </IconButton>
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
