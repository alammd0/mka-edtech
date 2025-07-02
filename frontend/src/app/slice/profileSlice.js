import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },

    userLogout: (state) => {
      state.profile = null;
      localStorage.removeItem("profile");
    },
  },
});

export const { setProfile, userLogout } = profileSlice.actions;

export default profileSlice.reducer;
