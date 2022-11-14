import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAccessToken } from "../../api/reddit-auth";

export const login = createAsyncThunk("login/login", async (code) => {
  const response = await loadAccessToken(code);
  localStorage.setItem("user_access", JSON.stringify(response));
  return response;
});

const option = {
  name: "login",
  initialState: {
    accessToken: "",
    loginIsPending: false,
    loginHasError: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loginIsPending = true;
      state.loginHasError = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loginIsPending = false;
      state.loginHasError = false;
      state.accessToken = action.payload.access_token;
    },
    [login.rejected]: (state, action) => {
      state.loginIsPending = false;
      state.loginHasError = true;
    },
  },
};

const loginSlice = createSlice(option);

export default loginSlice.reducer;

export const { setAccessToken } = loginSlice.actions;

export const selectLoginStatus = (state) => {
  return {
    accessToken: state.loginReducer.accessToken,
    isPending: state.loginReducer.loginIsPending,
    hasError: state.loginReducer.loginHasError,
  };
};
