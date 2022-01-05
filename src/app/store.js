import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../feature/alert/AlertSlice"
import AllProfileSlice  from "../feature/AllProfile/AllProfileSlice";
import authSlice from "../feature/auth/authSlice";
import  postSlice  from "../feature/post/PostSlice";
import profileSlice from "../feature/profile/ProfileSlice";
export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authSlice,
    profile:profileSlice,
    posts : postSlice,
    Fullprofiles: AllProfileSlice
  },
});
