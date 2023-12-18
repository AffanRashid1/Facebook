import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  Menu,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { Like } from "../../assets/assets";
import Checkbox from "@mui/material/Checkbox";
import apiManager from "../../helper/apiManager";
import Comment from "../Comment/Comment";
import TimeAgo from "../TimeAgo";
import CustomModal from "../CustomModal";
import PostImg from "./PostImg";

const Post = ({ data, updateProfileData, getFeedPosts, isProfile }) => {
  const [delLoading, setDelLoading] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentBox, setCommentBox] = useState(false);

  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.appReducer.user);

  const handleProfileLikeClick = async (postId) => {
    try {
      let response = await apiManager({
        method: "post",
        path: `/posts/like/${postId}`,
      });

      isProfile ? updateProfileData() : getFeedPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    setDelLoading(true);
    try {
      let response = await apiManager({
        method: "delete",
        path: `/posts/delete-post/${data?._id}`,
      });
      isProfile ? updateProfileData() : getFeedPosts();
      toast.success(response?.data?.message);
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <>
      <Card key={data?._id} sx={{ marginBottom: "20px", borderRadius: "10px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "gray" }} src={data?.owner?.profile_photo} />
          }
          action={
            <>
              <IconButton
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
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
                {data?.postOwner?._id === user?._id && (
                  <MenuItem onClick={deletePost}>
                    Delete
                    <LoadingButton variant="text" loading={delLoading} />
                  </MenuItem>
                )}
                <MenuItem>Report</MenuItem>
              </Menu>
            </>
          }
          title={data?.postOwner?.name}
          subheader={<TimeAgo createdAt={data?.postOwner?.createdAt} />}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {data?.caption}
          </Typography>
        </CardContent>

        {/* Image  */}
        {!!data?.postimages?.length && <PostImg img={data?.postimages} />}

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
              setLikeModal(true);
            }}
          >
            <img src={Like} alt="svg" width="18" />
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
                checked={data?.likes?.find(({ _id }) => _id === user?._id)}
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
              setCommentBox(!commentBox);
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
          getFeedPosts={getFeedPosts}
        />
      </Card>

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
      </CustomModal>
    </>
  );
};
export default Post;
