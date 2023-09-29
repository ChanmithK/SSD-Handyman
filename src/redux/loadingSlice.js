import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  loading: false,
};

const loadingSlice = createSlice({
  name: "loadingData",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUserData, setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
