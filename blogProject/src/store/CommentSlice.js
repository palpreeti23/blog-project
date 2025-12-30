import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  comment: null,
};

const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.$id !== action.payload
      );
      state.comment = null;
    },
    updateComment: (state, action) => {
      state.comments = state.comments.map((comment) =>
        comment.$id === action.payload.$id ? action.payload : comment
      );
      state.comment = action.payload;
    },
  },
});

export const {
  setComment,
  setComments,
  addComment,
  updateComment,
  deleteComment,
} = CommentSlice.actions;
export default CommentSlice.reducer;
