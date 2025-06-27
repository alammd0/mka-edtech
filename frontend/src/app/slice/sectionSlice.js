import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  section: null,
  sectionId: null,
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,

  reducers: {
    
    setSection: (state, action) => {
      state.section = action.payload;
    },

    setSectionId: (state, action) => {
      state.sectionId = action.payload;
    },
  },
});

export const { setSection, setSectionId } = sectionSlice.actions;

export default sectionSlice.reducer;
