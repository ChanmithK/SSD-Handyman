import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Blogs",
};

const titleSlice = createSlice({
  name: "titleName",
  initialState,
  reducers: {
    setTileName(state, action) {
      state.title = action.payload;
    },
  },
});

export const { setTileName } = titleSlice.actions;
export default titleSlice.reducer;
