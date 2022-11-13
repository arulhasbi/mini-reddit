import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAccessToken } from "../../api/reddit";

export const login = createAsyncThunk("login/login", async (code) => {
  const response = await loadAccessToken(code);
  localStorage.setItem("user_access", JSON.stringify(response));
  return response;
});

const option = {
  name: "login",
  initialState: {
    loginIsPending: false,
    loginHasError: false,
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loginIsPending = true;
      state.loginHasError = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loginIsPending = false;
      state.loginHasError = false;
    },
    [login.rejected]: (state, action) => {
      state.loginIsPending = false;
      state.loginHasError = true;
    },
  },
};

const loginSlice = createSlice(option);

export default loginSlice.reducer;

export const selectLoginStatus = (state) => {
  return {
    isPending: state.loginReducer.loginIsPending,
    hasError: state.loginReducer.loginHasError,
  };
};
