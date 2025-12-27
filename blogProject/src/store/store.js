import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import postReducer from "./PostSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
