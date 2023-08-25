import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "./AppbarTitleSlice";
import userDataReducer from "./UserDataSlice";
export const store = configureStore({
  reducer: {
    setTitle: titleReducer,
    setUserData: userDataReducer,
  },
});
