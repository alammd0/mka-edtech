import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  courseId: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,

  reducers: {
    setCourse: (state, actions) => {
      state.course = actions.payload;
    },

    setCourseId: (state, actions) => {
      state.courseId = actions.payload;
    },
  },
});

export const { setCourse, setCourseId } = courseSlice.actions;

export default courseSlice.reducer;
