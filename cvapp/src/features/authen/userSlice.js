import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const axios = require('axios')

export const registerUser = createAsyncThunk('user/register', async ({ firstName, lastName, email, username, password }) => {
  let user = await axios.post('http://localhost:8080/user', { firstName: firstName.trim(), lastName: lastName.trim(), email, username, password })
  return user.data
})

export const loginUser = createAsyncThunk('user/login', async ({ username, password }, { dispatch, rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/login', { username, password })
    let userInfo = await axios.get('http://localhost:8080/user', {
      params: { username },
      headers: { Authorization: `${response.headers.token}` },
    })
    return { ...response.headers, user: userInfo.data }
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
      state.user = null
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem('my-cv-token', action.payload.token)
      state.user = action.payload.user
      state.loginStatus = 'success'
    },
    [loginUser.rejected]: (state, action) => {
      console.log(action.payload)
      state.loginStatus = 'failed'
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
