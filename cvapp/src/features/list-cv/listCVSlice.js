import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import moment from 'moment'
import { GetToken } from '../../utilities/authenUtility'
const axios = require('axios')

export const fetchCv = createAsyncThunk('list/fetchCv', async (arg, { rejectWithValue }) => {
  try {
    let ret = await axios.get('http://localhost:8080/cv-info', { headers: GetToken() })
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const listCVSlice = createSlice({
  name: 'create',
  initialState: {
    listCv: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCv.pending]: (state, action) => {
      state.listCv = null
    },
    [fetchCv.fulfilled]: (state, action) => {
      state.listCv = action.payload
    },
    [fetchCv.rejected]: (state, action) => {
      state.listCv = null
    },
  },
})

// export const {} = listCVSlice.actions

export default listCVSlice.reducer
