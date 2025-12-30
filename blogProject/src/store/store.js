import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import postReducer from "./PostSlice";
import commentReducer from "./CommentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export default store;
