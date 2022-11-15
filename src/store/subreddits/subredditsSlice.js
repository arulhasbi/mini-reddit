import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubreddits } from "../../api/enpoints";

export const loadSubreddits = createAsyncThunk(
  "subreddits/loadSubreddits",
  async ({ where, token }) => {
    const response = await getSubreddits(where, token);
    return response;
  }
);

const option = {
  name: "subreddits",
  initialState: {
    subreddits: [],
    loadSubredditsIsPending: false,
    loadSubredditsHasError: false,
  },
  extraReducers: {
    [loadSubreddits.pending]: (state, action) => {
      state.loadSubredditsIsPending = true;
      state.loadSubredditsHasError = false;
    },
    [loadSubreddits.fulfilled]: (state, action) => {
      state.loadSubredditsIsPending = false;
      state.loadSubredditsHasError = false;
      const subreddits = action.payload.data.children.map((child) => {
        return {
          id: child.data.id,
          name: child.data.display_name_prefixed,
        };
      });
      state.subreddits = subreddits;
    },
    [loadSubreddits.rejected]: (state, action) => {
      state.loadSubredditsIsPending = false;
      state.loadSubredditsHasError = true;
    },
  },
};

const subredditsSlice = createSlice(option);

export default subredditsSlice.reducer;

export const selectAllSubreddits = (state) =>
  state.subredditsReducer.subreddits;

export const selectLoadSubredditsStatus = (state) => {
  return {
    isPending: state.subredditsReducer.loadSubredditsIsPending,
    hasError: state.subredditsReducer.loadSubredditsHasError,
  };
};
