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

export const deleteCv = createAsyncThunk('list/deleteCv', async ({ id }, { getState, rejectWithValue }) => {
  try {
    let cv = getState().list.listCv.find((cv) => cv.id === id)
    if (cv) {
      await axios.delete('http://localhost:8080/cv-info', { headers: GetToken(), data: cv })
      return id
    }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const listCVSlice = createSlice({
  name: 'create',
  initialState: {
    listCv: null,
  },
  reducers: {
    mergeCv(state, action) {
      let { cv } = action.payload
      let exist = state.listCv.findIndex((item) => item.id === cv.id)
      if (exist === -1) {
        state.listCv.push(cv)
      } else {
        state.listCv[exist] = cv
      }
    },
  },
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

    [deleteCv.fulfilled]: (state, action) => {
      let id = action.payload
      state.listCv = state.listCv.filter((cv) => cv.id !== id)
    },
  },
})

export const { mergeCv } = listCVSlice.actions

export default listCVSlice.reducer
