import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "./AppbarTitleSlice";
import userDataReducer from "./UserDataSlice";
import loadingReducer from "./loadingSlice";
export const store = configureStore({
  reducer: {
    setTitle: titleReducer,
    setUserData: userDataReducer,
    setLoading: loadingReducer,
  },
});
