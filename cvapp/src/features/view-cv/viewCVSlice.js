import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const axios = require('axios')

export const fetchCvView = createAsyncThunk('view/fetchCvView', async ({ identifier }, { getState, rejectWithValue }) => {
  try {
    let ret = await axios.get('http://localhost:8080/cvwr/' + identifier)
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const addDownload = createAsyncThunk('view/addDownload', async ({ identifier }, { getState, rejectWithValue }) => {
  try {
    console.log('aaa');
    let ret = await axios.post('http://localhost:8080/cvwr/' + identifier)
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
      let info = action.payload
      let mappedInfo = {
        ...info,
        activities: JSON.parse(info.activities),
        hobbies: JSON.parse(info.hobbies),
        books: JSON.parse(info.books),
        journals: JSON.parse(info.journals),
        presentations: JSON.parse(info.presentations),
        orders: JSON.parse(info.orders),
      }
      state.cvView = mappedInfo
    },
    [fetchCvView.rejected]: (state, action) => {
      state.cvView = null
    },
  },
})

// export const {} = viewCVSlice.actions

export default viewCVSlice.reducer
