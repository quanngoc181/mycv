import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../utilities/authenUtility'
const axios = require('axios')

export const fetchAccount = createAsyncThunk('user/fetchAccount', async (arg, { rejectWithValue }) => {
  try {
    let account = await axios.get('http://localhost:8080/user-info', { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    user: null,
  },
  reducers: {
    resetUser(state, action) {
      state.user = null
    },
  },
  extraReducers: {
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

export const { resetUser } = infoSlice.actions

export default infoSlice.reducer
