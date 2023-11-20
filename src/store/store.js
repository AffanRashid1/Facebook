import { createSlice, configureStore } from "@reduxjs/toolkit";
import { postsData } from "../Data/data";
import reducer from "./reducer";

const initialState = {
  posts: postsData,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addLike: (state, action) => {
      let postIndex = action.payload;
      state.posts[postIndex].likeCount += 1;
      state.posts[postIndex].liked = true;
    },
    removeLike: (state, action) => {
      let postIndex = action.payload;
      state.posts[postIndex].likeCount -= 1;
      state.posts[postIndex].liked = false;
    },
  },
});

export const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    appReducer: reducer,
  },
});

export const { addLike, removeLike } = postSlice.actions;
