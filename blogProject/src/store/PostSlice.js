import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: null,
  // loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    addPost: (state, action) => {
      state.posts = state.posts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        post.$id === action.payload.$id ? action.payload : post;
      });
      state.post = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => {
        post.$id !== action.payload;
      });
      state.post = null;
    },
  },
});

export const { setPost, setPosts, addPost, updatePost, deletePost } =
  postSlice.actions;
export default postSlice.reducer;
