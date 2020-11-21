import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../utilities/authenUtility'
const axios = require('axios')

export const registerUser = createAsyncThunk('user/register', async ({ firstName, lastName, email, username, password }) => {
  let user = await axios.post('http://localhost:8080/user', { firstName, lastName, email, username, password })
  return user.data
})

export const loginUser = createAsyncThunk('user/login', async ({ username, password }, { dispatch, rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/login', { username, password })
    return response.headers
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const fetchAccount = createAsyncThunk('user/fetchAccount', async (arg, { rejectWithValue }) => {
  try {
    let account = await axios.get('http://localhost:8080/user', { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loginStatus: 'pending',
  },
  reducers: {
    logout(state, action) {
      localStorage.removeItem('my-cv-token')
      state.loginStatus = 'pending'
      state.user = null
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      console.log('Register successfully', action.payload)
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
    [fetchAccount.pending]: (state, action) => {
      state.user = null
    },
    [fetchAccount.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [fetchAccount.rejected]: (state, action) => {
      state.user = null
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
