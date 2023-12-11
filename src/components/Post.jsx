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
  Stack,
  FormControlLabel,
  Backdrop,
  Menu,
  MenuItem,
  CircularProgress,
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
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import likeSvg from "../assets/facebook-like.svg";
import apiManager from "../Helper/ApiManager";
import Comment from "./Comment";
import { LoadingButton } from "@mui/lab";

const Post = ({ data, updateProfileData, feedPosts, isProfile }) => {
  const user = useSelector((state) => state.appReducer.user);
  const [imgLoading, setimgLoading] = useState(true);
  const [delLoading, setdelLoading] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const [likeModal, setlikeModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentBox, setcommentBox] = useState(false);
  const open = Boolean(anchorEl);

  const handleProfileLikeClick = async (postId) => {
    try {
      let response = await apiManager({
        method: "post",
        path: `/posts/like/${postId}`,
      });

      data?.likes.push(response?.data?.likerId);
      isProfile ? updateProfileData() : feedPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    setdelLoading(true);
    try {
      let response = await apiManager({
        method: "delete",
        path: `/posts/delete-post/${data?._id}`,
      });
      isProfile ? updateProfileData() : feedPosts();
      setdelLoading(false);
      toast.success(response?.data?.message);
      setAnchorEl(null);
    } catch (error) {
      setdelLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const updateRelativeTime = () => {
      const now = moment();
      const postTime = moment(data?.createdAt);
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
    imageObj.src = data?.imageUrl;

    imageObj.onload = () => {
      setimgLoading(false);
    };

    return () => clearInterval(intervalId);
  }, [data?.createdAt]);

  return (
    <>
      <Card key={data?._id} sx={{ marginBottom: "20px", borderRadius: "10px" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "gray" }}
              src={
                data?.owner?.profile_photo[
                  data?.owner?.profile_photo?.length - 1
                ]
              }
            />
          }
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
                {data?.owner?._id == user?._id ? (
                  <MenuItem onClick={deletePost}>
                    Delete
                    <LoadingButton variant="text" loading={delLoading} />
                  </MenuItem>
                ) : null}
                <MenuItem>Report</MenuItem>
              </Menu>
            </>
          }
          title={data?.owner?.name}
          subheader={timeAgo}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {data?.caption}
          </Typography>
        </CardContent>

        {data?.imageUrl.length === 0 ? null : imgLoading ? (
          <Skeleton variant="rectangular" height={400} animation="wave" />
        ) : (
          <CardMedia
            component="img"
            height="auto%"
            image={data?.imageUrl[0]}
            alt="Post"
          />
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
              {data?.likes?.length}
            </Typography>
          </Stack>
          <Typography color="typography.light" fontSize={14}>
            {data?.comments?.length} comments
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
                checked={data?.likes?.find(({ _id }) => _id == user?._id)}
                onChange={() => handleProfileLikeClick(data?._id)}
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
        <Comment
          data={data}
          commentBox={commentBox}
          isProfile={isProfile}
          updateProfileData={updateProfileData}
          feedPosts={feedPosts}
        />
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
            <Typography color="typography.dark">
              {data?.likes?.length}
            </Typography>
          </Stack>
          <Divider />
          {data?.likes?.length == undefined || 0 ? (
            <Typography color="typography.dark" textAlign="center">
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
        </Box>
      </Modal>
    </>
  );
};
export default Post;
