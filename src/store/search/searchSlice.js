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
    searches: [],
    loadSearchesIsPending: false,
    loadSearchesHasError: false,
  },
  extraReducers: {
    [loadSearches.pending]: (state, action) => {
      state.loadSearchesIsPending = true;
      state.loadSearchesHasError = false;
      console.log(action.payload);
    },
    [loadSearches.fulfilled]: (state, action) => {
      state.loadSearchesIsPending = false;
      state.loadSearchesHasError = false;
      console.log(action.payload);
    },
    [loadSearches.rejected]: (state, action) => {
      state.loadSearchesIsPending = false;
      state.loadSearchesHasError = true;
      console.log(action.payload);
    },
  },
};

const searchSlice = createSlice(option);

export default searchSlice.reducer;

export const selectAllSearches = (state) => state.searchReducer.searches;

export const selectLoadSearchesStatus = (state) => {
  return {
    isPending: state.searchReducer.loadSearchesIsPending,
    hasError: state.searchReducer.loadSearchesHasError,
  };
};
