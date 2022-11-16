import { createSlice } from "@reduxjs/toolkit";

const option = {
  name: "responsive",
  initialState: {
    phone: false,
  },
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
};

const responsiveSlice = createSlice(option);

export default responsiveSlice.reducer;

export const { setPhone } = responsiveSlice.actions;

export const selectPhone = (state) => state.responsiveReducer.phone;
