import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import courseReducer from "./slice/courseSlice";
import sectionReducer from "./slice/sectionSlice";
import profileReducer from "./slice/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    section: sectionReducer,
    profile: profileReducer,
  },
});
