import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const axios = require('axios')

export const registerUser = createAsyncThunk('user/register', async ({ email, username, password }) => {
  let user = await axios.post('http://localhost:8080/user', { email, username, password })
  return user.data
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
    user: null,
  },
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      console.log('Register successfully', action.payload)
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem('my-cv-token', action.payload.token)
    },
    [loginUser.rejected]: (state, action) => {
      console.log(action.payload)
    },
  },
})

// export const {} = userSlice.actions

export default userSlice.reducer
