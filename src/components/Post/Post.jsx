import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Divider,
  Stack,
  FormControlLabel,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Like } from "../../assets/assets";
import Checkbox from "@mui/material/Checkbox";
import apiManager from "../../helper/apiManager";
import Comment from "../Comment/Comment";
import TimeAgo from "../TimeAgo/TimeAgo";
import PostImg from "./PostImg";
import PostMenu from "./PostMenu";
import LikeModal from "./LikeModal";
import { toast } from "react-toastify";

const Post = ({ data, updateProfileData, getFeedPosts, isProfile }) => {
  const [likeModal, setLikeModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [isChecked, setIsChecked] = useState(
    data?.likes?.some(({ _id }) => _id === user?._id)
  );

  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.appReducer.user);

  // const handleProfileLikeClick = async (postId) => {
  //   try {
  //     let response = await apiManager({
  //       method: "post",
  //       path: `/posts/like/${postId}`,
  //     });

  //     isProfile ? updateProfileData() : getFeedPosts();
  //   } catch (error) {
  //     toast?.error(error?.message);
  //   }
  // };

  const handleProfileLikeClick = async (postId) => {
    try {
      const newChecked = !isChecked;

      setIsChecked(newChecked);

      let response = await apiManager({
        method: "post",
        path: `/posts/like/${postId}`,
      });
    } catch (error) {
      toast?.error(error?.message);
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
              <PostMenu
                anchorEl={anchorEl}
                open={open}
                setAnchorEl={setAnchorEl}
                data={data}
                isProfile={isProfile}
                getFeedPosts={getFeedPosts}
                updateProfileData={updateProfileData}
              />
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
              // <Checkbox
              //   icon={<ThumbUpOutlinedIcon />}
              //   checkedIcon={<ThumbUpIcon />}
              //   checked={data?.likes?.find(({ _id }) => _id === user?._id)}
              //   onChange={() => handleProfileLikeClick(data?._id)}
              //   color="primary"
              // />
              <Checkbox
                icon={<ThumbUpOutlinedIcon />}
                checkedIcon={<ThumbUpIcon />}
                checked={isChecked}
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
              setShowComments(!showComments);
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
        <Comment data={data} showComments={showComments} />
      </Card>

      {/* Like Modal  */}

      <LikeModal
        likeModal={likeModal}
        setLikeModal={setLikeModal}
        data={data}
      />
    </>
  );
};
export default Post;
