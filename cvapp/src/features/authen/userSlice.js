import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const axios = require('axios')

export const registerUser = createAsyncThunk('user/register', async ({ firstName, lastName, email, username, password }, { rejectWithValue }) => {
  try {
    let user = await axios.post('http://localhost:8080/user', { firstName, lastName, email, username, password })
    return user.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const loginUser = createAsyncThunk('user/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/login', { username, password })
    return response.headers
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginStatus: 'pending',
    registerStatus: 'pending',
    registerError: '',
  },
  reducers: {
    resetToken(state, action) {
      localStorage.removeItem('my-cv-token')
      state.loginStatus = 'pending'
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.registerStatus = 'pending'
    },
    [registerUser.fulfilled]: (state, action) => {
      state.registerStatus = 'success'
    },
    [registerUser.rejected]: (state, action) => {
      state.registerStatus = 'failed'
      state.registerError = action.payload.message
    },
    [loginUser.pending]: (state, action) => {
      state.loginStatus = 'pending'
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem('my-cv-token', action.payload.token)
      state.loginStatus = 'success'
    },
    [loginUser.rejected]: (state, action) => {
      localStorage.removeItem('my-cv-token')
      state.loginStatus = 'failed'
    },
  },
})

export const { resetToken } = userSlice.actions

export default userSlice.reducer
