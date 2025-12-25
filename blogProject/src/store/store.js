import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // post: postReducer,
  },
});

export default store;
