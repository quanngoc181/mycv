import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const axios = require('axios')

export const fetchCvView = createAsyncThunk('view/fetchCvView', async ({ identifier }, { getState, rejectWithValue }) => {
  try {
    let ret = await axios.get('http://localhost:8080/cvs/' + identifier)
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const addDownload = createAsyncThunk('view/addDownload', async ({ identifier }, { getState, rejectWithValue }) => {
  try {
    let ret = await axios.post('http://localhost:8080/cvs/download-cv?identifier=' + identifier)
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const viewCVSlice = createSlice({
  name: 'view',
  initialState: {
    cvView: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCvView.pending]: (state, action) => {
      state.cvView = null
    },
    [fetchCvView.fulfilled]: (state, action) => {
      state.cvView = action.payload
    },
  },
})

// export const {} = viewCVSlice.actions

export default viewCVSlice.reducer
