import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Checkbox from "@mui/material/Checkbox";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike } from "../store/store";

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
}) => {
  // const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();

  const handleLikeClick = (postIndex, liked) => {
    if (liked) {
      dispatch(removeLike(postIndex));
    } else {
      dispatch(addLike(postIndex));
    }
  };

  return (
    <>
      <Card key={id} sx={{ marginBottom: "20px" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "red" }} src={icon} />}
          action={
            <IconButton>
              <MoreHorizIcon />
              {/* <CloseIcon /> */}
            </IconButton>
          }
          title={name}
          subheader={date}
        />
        <CardMedia
          component="img"
          height="auto%"
          image={image}
          alt="Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {/* Buttons */}
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleLikeClick(id, likes)}
          >
            <Checkbox
              label="236 likes"
              icon={<ThumbUpOffAltIcon />}
              checkedIcon={<ThumbUpAltIcon />}
            />
            <Typography variant="small" sx={{ fontSize: "16px" }}>
              {likes} Likes
            </Typography>
          </IconButton>
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
      </Card>
    </>
  );
};
export default Post;
