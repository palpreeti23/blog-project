import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: null,
  loading: false,
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
      state.post.push(action.payload);
    },
    updatePost: (state, action) => {
      state.post = state.post.map((post) => {
        post.$id === action.payload.$id ? action.payload : post;
      });
      state.post = action.payload;
    },
    deletePost: (state, action) => {
      state.post = state.post.filter((post) => {
        post.$id !== action.payload.$id;
      });
    },
  },
});

export const { setPost, setPosts, addPost, updatePost, deletePost } =
  postSlice.actions;
export default postSlice.reducer;
