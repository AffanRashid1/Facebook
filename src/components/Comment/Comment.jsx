import React, { useState } from "react";
import { Avatar, Box, Divider, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import apiManager from "../../helper/apiManager";
import ShowComment from "./ShowComment";

const Comment = ({ data, showComments }) => {
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.appReducer.user);

  const handleComment = async () => {
    setIsLoading(true);
    try {
      if (commentInput?.trim()) {
        let res = await apiManager({
          method: "post",
          path: `/posts/comment`,
          params: {
            id: data?._id,
            comment: commentInput,
          },
        });

        let commentData = {
          _id: res?.data?.payload?.newComment._id,
          postid: res?.data?.payload?.newComment.postid,
          owner: {
            _id: res?.data?.payload?.Commenter?._id,
            name: res?.data?.payload?.Commenter?.name,
            profile_photo: res?.data?.payload?.Commenter?.profile_photo,
          },
          comment: res?.data?.payload?.newComment?.comment,
          createdAt: res?.data?.payload?.Commenter?.createdAt,
        };

        data?.comments.push(commentData);
        setCommentInput("");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: showComments ? "block" : "none" }}>
        {data?.comments?.map((comment, i) => {
          return (
            <ShowComment
              comment={comment}
              key={i}
              updateData={isProfile ? updateProfileData : getFeedPosts}
            />
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
            autoFocus
            placeholder="Submit Your Comment"
            fullWidth
            sx={{ margin: "0 10px" }}
            value={commentInput}
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleComment();
              }
            }}
          />
          {isLoading ? (
            <LoadingButton loading={isLoading} />
          ) : (
            <IconButton onClick={handleComment}>
              <SendIcon sx={{ color: "#1877F2" }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Comment;
