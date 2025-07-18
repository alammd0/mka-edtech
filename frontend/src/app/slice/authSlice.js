import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    userLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

  },
});

export const { setUser, setToken, setLoading, userLogout } = authSlice.actions;

export default authSlice.reducer;
