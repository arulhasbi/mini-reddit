import { configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from "./login/loginSlice";

export const store = configureStore({
  reducer: {
    loginReducer: loginSliceReducer,
  },
});
