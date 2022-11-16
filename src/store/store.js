import { configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from "./login/loginSlice";
import subredditsSliceReducer from "./subreddits/subredditsSlice";
import postsSliceReducer from "./posts/postsSlice";
import commentsSliceReducer from "./comments/commentsSlice";
import votesSliceReducer from "./votes/votesSlice";

export const store = configureStore({
  reducer: {
    loginReducer: loginSliceReducer,
    subredditsReducer: subredditsSliceReducer,
    postsReducer: postsSliceReducer,
    commentsReducer: commentsSliceReducer,
    votesReducer: votesSliceReducer,
  },
});
