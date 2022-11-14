import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts } from "../../api/enpoints";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async ({ where, token }) => {
    const response = await getPosts(where, token);
    return response;
  }
);

const option = {
  name: "posts",
  initialState: {
    posts: [],
    loadPostsIsPending: false,
    loadPostsHasError: false,
  },
  extraReducers: {
    [loadPosts.pending]: (state, action) => {
      state.loadPostsIsPending = true;
      state.loadPostsHasError = false;
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.loadPostsIsPending = false;
      state.loadPostsHasError = false;
      const posts = action.payload.data.children.map((child) => {
        return {
          subreddit_name: child.data.subreddit_name_prefixed,
          author: child.data.author,
          num_comments: child.data.num_comments,
          title: child.data.title,
          created_utc: child.data.created_utc,
        };
      });
      state.posts = posts;
    },
    [loadPosts.rejected]: (state, action) => {
      state.loadPostsIsPending = false;
      state.loadPostsHasError = true;
    },
  },
};

const postsSlice = createSlice(option);

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.postsReducer.posts;

export const selectLoadPostsStatus = (state) => {
  return {
    isPending: state.postsReducer.loadPostsIsPending,
    hasError: state.postsReducer.loadPostsHasError,
  };
};
