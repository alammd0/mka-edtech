import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null,
    token : null,
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
    },
    
    setLoading : (state, action) => {
        state.token = action.payload
    }
  },
})


export const { setUser, setToken, setLoading } = authSlice.actions

export default authSlice.reducer