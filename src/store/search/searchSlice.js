import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearch } from "../../api/enpoints";

export const loadSearches = createAsyncThunk(
  "search/loadSearches",
  async ({ where, token }) => {
    const response = await getSearch(where, token);
    return response;
  }
);

const option = {
  name: "search",
  initialState: {
    isLookingForSearches: false,
    searches: [],
    loadSearchesIsPending: false,
    loadSearchesHasError: false,
  },
  reducers: {
    setSearchStatus: (state, action) => {
      state.isLookingForSearches = action.payload;
    },
  },
  extraReducers: {
    [loadSearches.pending]: (state, action) => {
      state.loadSearchesIsPending = true;
      state.loadSearchesHasError = false;
    },
    [loadSearches.fulfilled]: (state, action) => {
      state.loadSearchesIsPending = false;
      state.loadSearchesHasError = false;
      const searches = action.payload.data.children.map((child) => {
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
      state.searches = searches;
    },
    [loadSearches.rejected]: (state, action) => {
      state.loadSearchesIsPending = false;
      state.loadSearchesHasError = true;
    },
  },
};

const searchSlice = createSlice(option);

export default searchSlice.reducer;

export const selectAllSearches = (state) => state.searchReducer.searches;

export const { setSearchStatus } = searchSlice.actions;

export const selectSearchStatus = (state) =>
  state.searchReducer.isLookingForSearches;

export const selectLoadSearchesStatus = (state) => {
  return {
    isPending: state.searchReducer.loadSearchesIsPending,
    hasError: state.searchReducer.loadSearchesHasError,
  };
};
