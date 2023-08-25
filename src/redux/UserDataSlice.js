import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const userDataSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
