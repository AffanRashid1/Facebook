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
  FormControlLabel,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import likeSvg from "../assets/facebook-like.svg";

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
  feedPosts,
}) => {
  const [modal, setmodal] = useState(false);
  const [loading, setloading] = useState(true);
  const user = useSelector((state) => state.appReducer.user);
  const [commentInput, setcommentInput] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [liked, setLiked] = useState(false);
  const [commentBox, setcommentBox] = useState(false);

  const handleProfileLikeClick = async (postId, liked) => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/posts/like/${postId}`
      );
      setLiked((prevLiked) => !prevLiked);

      // likes.push(res?.data);
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
      feedPosts();
      updateProfileData();
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

    const imageObj = new Image();
    imageObj.src = image;

    imageObj.onload = () => {
      setloading(false);
    };

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

        {image.length === 0 ? null : loading ? (
          <Skeleton variant="rectangular" height={500} animation="wave" />
        ) : (
          <CardMedia component="img" height="auto%" image={image} alt="Post" />
        )}
        <Divider />
        <Stack
          direction={"row"}
          justifyContent="space-between"
          padding="3px 10px"
        >
          <Stack direction="row" spacing={0.5}>
            <img src={likeSvg} alt="svg" width="18" />
            <Typography color="typography.light" fontSize={14}>
              13
            </Typography>
          </Stack>
          <Typography color="typography.light" fontSize={14}>
            13 comments
          </Typography>
        </Stack>
        <Divider />

        {/* Buttons */}
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                icon={<ThumbUpOutlinedIcon />}
                checkedIcon={<ThumbUpIcon />}
                checked={liked}
                onChange={() => handleProfileLikeClick(id, likes)}
                color="primary"
              />
            }
            label={"23"}
          />

          <IconButton
            aria-label="share"
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              setcommentBox(!commentBox);
            }}
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
              Shares
            </Typography>
          </IconButton>
        </CardActions>
        <Divider />
        <Box sx={{ display: commentBox ? "block" : "none" }}>
          {comment?.map((comment) => {
            return (
              <Stack
                direction={"row"}
                spacing={3}
                alignItems={"center"}
                margin={"8px 10px"}
              >
                <Avatar
                  sx={{ height: "22px", width: "22px" }}
                  src={comment?.owner?.profile_photo}
                />
                <Box
                  sx={{
                    // backgroundColor: "#F0F2F6",
                    bgcolor: "action.selected",
                    borderRadius: "6px",
                    padding: "5px 8px",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    fontSize="14px"
                    letterSpacing="1px"
                  >
                    {comment?.owner?.name}
                  </Typography>
                  <Typography fontSize={"15px"}>{comment?.comment}</Typography>
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
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  handleComment();
                }
              }}
            />
            <IconButton onClick={handleComment}>
              <SendIcon sx={{ color: "#1877F2" }} />
            </IconButton>
          </Box>
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
