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
  Skeleton,
  Divider,
  InputBase,
  Stack,
  FormControlLabel,
  Backdrop,
  Menu,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import likeSvg from "../assets/facebook-like.svg";
import apiManager from "../Helper/ApiManager";

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
  isProfile,
  ownerId,
}) => {
  const user = useSelector((state) => state.appReducer.user);
  const [loading, setloading] = useState(true);
  const [commentInput, setcommentInput] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [commentBox, setcommentBox] = useState(false);
  const [likeModal, setlikeModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileLikeClick = async (postId) => {
    try {
      let response = await apiManager({
        method: "post",
        path: `/posts/like/${postId}`,
      });

      likes.push(response?.data?.likerId);
      isProfile ? updateProfileData() : feedPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      if (commentInput?.trim()) {
        let res = await apiManager({
          method: "post",
          path: `/posts/comment`,
          params: {
            id,
            comment: commentInput,
          },
        });
        comment.push(res?.data?.newComment);
        setcommentInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async () => {
    try {
      let response = await apiManager({
        method: "delete",
        path: `/posts/delete-post/${id}`,
      });
      toast.success(response?.data?.message);
      isProfile ? updateProfileData() : feedPosts();
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
            <>
              <IconButton
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                  setAnchorEl(null);
                }}
              >
                {ownerId == user?._id ? (
                  <MenuItem onClick={deletePost}>Delete</MenuItem>
                ) : null}
                <MenuItem>Report</MenuItem>
              </Menu>
            </>
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
          <Stack
            direction="row"
            spacing={0.5}
            onClick={() => {
              setlikeModal(true);
            }}
          >
            <img src={likeSvg} alt="svg" width="18" />
            <Typography color="typography.light" fontSize={14}>
              {likes?.length}
            </Typography>
          </Stack>
          <Typography color="typography.light" fontSize={14}>
            {comment?.length} comments
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
                checked={likes?.find(({ _id }) => _id == user?._id)}
                onChange={() => handleProfileLikeClick(id, likes)}
                color="primary"
              />
            }
            label={"Like"}
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

        {/* Comment Section */}

        <Box sx={{ display: commentBox ? "block" : "none" }}>
          {comment?.map((comment, i) => {
            return (
              <Stack
                direction={"row"}
                spacing={3}
                alignItems={"center"}
                margin={"8px 10px"}
                key={i}
                width="400px"
              >
                <Avatar
                  sx={{ height: "22px", width: "22px" }}
                  src={comment?.owner?.profile_photo}
                />
                <Box
                  sx={{
                    bgcolor: "action.selected",
                    borderRadius: "6px",
                    padding: "5px 8px",
                    width: "50%",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    fontSize="14px"
                    letterSpacing="1px"
                  >
                    {comment?.owner?.name}
                  </Typography>
                  <Typography
                    fontSize={"15px"}
                    sx={{ overflowWrap: "break-word" }}
                  >
                    {comment?.comment}
                  </Typography>
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

      {/* Like Modal */}
      <Modal
        open={likeModal}
        onClose={() => {
          setlikeModal(false);
        }}
        disableAutoFocus
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
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
          <Stack spacing={1} direction="row" mb={2}>
            <img src={likeSvg} alt="logo" width={25} />
            <Typography color="typography.dark">{likes?.length}</Typography>
          </Stack>
          <Divider />
          {likes?.length == undefined || 0 ? (
            <Typography color="typography.dark" textAlign="center">
              No likes
            </Typography>
          ) : (
            likes.map((liker, i) => {
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
        </Box>
      </Modal>
    </>
  );
};
export default Post;
