import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import courseReducer from "./slice/courseSlice";
import sectionReducer from "./slice/sectionSlice"

export const store = configureStore({
  reducer: {
    auth : authReducer,
    course : courseReducer,
    section : sectionReducer,
  },
});
