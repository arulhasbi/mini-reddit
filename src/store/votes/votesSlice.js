import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postVotes } from "../../api/enpoints";

export const updateVotes = createAsyncThunk(
  "votes/updateVotes",
  async ({ where, token }) => {
    const response = await postVotes(where, token);
    return response;
  }
);

const option = {
  name: "votes",
  initialState: {
    updateVotesIsPending: false,
    updateVotesHasError: false,
  },
  extraReducers: {
    [updateVotes.pending]: (state, action) => {
      state.updateVotesIsPending = true;
      state.updateVotesHasError = false;
    },
    [updateVotes.fulfilled]: (state, action) => {
      state.updateVotesIsPending = false;
      state.updateVotesHasError = false;
    },
    [updateVotes.rejected]: (state, action) => {
      state.updateVotesIsPending = false;
      state.updateVotesHasError = true;
    },
  },
};

const votesSlice = createSlice(option);

export default votesSlice.reducer;

export const selectUpdateVotesStatus = (state) => {
  return {
    isPending: state.votesReducer.updateVotesIsPending,
    hasError: state.votesReducer.updateVotesHasError,
  };
};
