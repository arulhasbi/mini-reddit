import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComments } from "../../api/enpoints";

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async ({ where, token }) => {
    const response = await getComments(where, token);
    return response;
  }
);

const option = {
  name: "comments",
  initialState: {
    postID: "",
    comments: [],
    loadCommentsIsPending: false,
    loadCommentsHasError: false,
  },
  reducers: {
    setPostID: (state, action) => {
      state.postID = action.payload;
    },
  },
  extraReducers: {
    [loadComments.pending]: (state, action) => {
      state.loadCommentsIsPending = true;
      state.loadCommentsHasError = false;
    },
    [loadComments.fulfilled]: (state, action) => {
      state.loadCommentsIsPending = false;
      state.loadCommentsHasError = false;
      const comments = action.payload[1].data.children.map((child) => {
        return {
          author: child.data.author,
          content: child.data.body,
          created_utc: child.data.created_utc,
        };
      });
      if (comments.length > 0) {
        comments.splice(comments.length - 1, 1);
      }
      state.comments = comments;
    },
    [loadComments.rejected]: (state, action) => {
      state.loadCommentsIsPending = false;
      state.loadCommentsHasError = true;
    },
  },
};

const commentsSlice = createSlice(option);

export default commentsSlice.reducer;

export const { setPostID } = commentsSlice.actions;

export const selectPostID = (state) => state.commentsReducer.postID;

export const selectLoadCommentsStatus = (state) => {
  return {
    isPending: state.commentsReducer.loadCommentsIsPending,
    hasError: state.commentsReducer.loadCommentsHasError,
  };
};

export const selectAllComments = (state) => state.commentsReducer.comments;
