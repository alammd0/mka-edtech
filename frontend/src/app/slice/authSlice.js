import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null,
    token : localStorage.getItem("token") || null,
    loading : false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser : (state, action) => {
        state.user = action.payload
    },

    setToken : (state, action) => {
        state.token = action.payload
        localStorage.setItem("token", action.payload);
    },
    
    setLoading : (state, action) => {
        state.loading = action.payload
    }
  },
})


export const { setUser, setToken, setLoading } = authSlice.actions

export default authSlice.reducer