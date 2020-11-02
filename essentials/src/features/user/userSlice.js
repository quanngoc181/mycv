import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = []

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  await sleep(1000)

  return [
    { id: '1', name: 'Vuong Ngoc Quan' },
    { id: '2', name: 'Nguyen Huong Hop' },
    { id: '3', name: 'Nguyen Khac Kien' },
  ]
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload
    },
  },
})

export default userSlice.reducer

export const selectAllUsers = (state) => state.user

export const selectUserById = (state, userId) => state.user.find((user) => user.id === userId)
