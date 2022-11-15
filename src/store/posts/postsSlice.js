import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, getPostsBasedOnSubreddit } from "../../api/enpoints";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async ({ where, token }) => {
    const response = await getPosts(where, token);
    return response;
  }
);

export const loadPostsBasedOnSubreddit = createAsyncThunk(
  "post/loadPostsBasedOnSubreddit",
  async ({ name, token }) => {
    const response = await getPostsBasedOnSubreddit(name, token);
    return response;
  }
);

const option = {
  name: "posts",
  initialState: {
    posts: [],
    loadPostsIsPending: false,
    loadPostsHasError: false,
    loadPostsBasedOnSubredditIsPending: false,
    loadPostsBasedOnSubredditHasError: false,
  },
  extraReducers: {
    [loadPosts.pending]: (state, action) => {
      state.loadPostsIsPending = true;
      state.loadPostsHasError = false;
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.loadPostsIsPending = false;
      state.loadPostsHasError = false;
      console.log(action.payload);
      const posts = action.payload.data.children.map((child) => {
        return {
          post_id: child.data.id,
          title: child.data.title,
          author: child.data.author,
          num_comments: child.data.num_comments,
          subreddit_id: child.data.subreddit_id,
          subreddit_name: child.data.subreddit_name_prefixed,
          score: child.data.score,
          created_utc: child.data.created_utc,
        };
      });
      state.posts = posts;
    },
    [loadPosts.rejected]: (state, action) => {
      state.loadPostsIsPending = false;
      state.loadPostsHasError = true;
    },
    [loadPostsBasedOnSubreddit.pending]: (state, action) => {
      state.loadPostsBasedOnSubredditIsPending = true;
      state.loadPostsBasedOnSubredditHasError = false;
    },
    [loadPostsBasedOnSubreddit.fulfilled]: (state, action) => {
      state.loadPostsBasedOnSubredditIsPending = false;
      state.loadPostsBasedOnSubredditHasError = false;
      const posts = action.payload.data.children.map((child) => {
        return {
          post_id: child.data.id,
          title: child.data.title,
          author: child.data.author,
          num_comments: child.data.num_comments,
          subreddit_id: child.data.subreddit_id,
          subreddit_name: child.data.subreddit_name_prefixed,
          created_utc: child.data.created_utc,
        };
      });
      state.posts = posts;
    },
    [loadPostsBasedOnSubreddit.rejected]: (state, action) => {
      state.loadPostsBasedOnSubredditIsPending = false;
      state.loadPostsBasedOnSubredditHasError = true;
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

export const selectLoadPostsBasedOnSubredditStatus = (state) => {
  return {
    isPending: state.postsReducer.loadPostsBasedOnSubredditIsPending,
    hasError: state.postsReducer.loadPostsBasedOnSubredditHasError,
  };
};
