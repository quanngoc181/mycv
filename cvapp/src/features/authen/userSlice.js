import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const axios = require('axios')

export const registerUser = createAsyncThunk('user/register', async ({ email, username, password }) => {
  let user = await axios.post('http://localhost:8080/user', { email, username, password })

  return user.data
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
  },
})

// export const {} = userSlice.actions

export default userSlice.reducer
