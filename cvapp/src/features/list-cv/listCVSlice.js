import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import moment from 'moment'
import { GetToken } from '../../util/authenUtil'
const axios = require('axios')

export const fetchCvs = createAsyncThunk('list/fetchCvs', async (arg, { rejectWithValue }) => {
  try {
    let ret = await axios.get('http://localhost:8080/users/current/cvs', { headers: GetToken() })
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const deleteCv = createAsyncThunk('list/deleteCv', async ({ id }, { getState, rejectWithValue }) => {
  try {
    await axios.delete('http://localhost:8080/users/current/cvs/' + id, { headers: GetToken() })
    return id
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const publicCv = createAsyncThunk('list/publicCv', async ({ id, cvPublic }, { getState, rejectWithValue }) => {
  try {
    let ret = await axios.post('http://localhost:8080/users/current/cvs/public-cv', { id, cvPublic }, { headers: GetToken() })
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getReceiver = createAsyncThunk('list/getReceiver', async ({ username }, { getState, rejectWithValue }) => {
  try {
    let ret = await axios.get('http://localhost:8080/users/' + username + '/info', { headers: GetToken() })
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const listCVSlice = createSlice({
  name: 'list',
  initialState: {
    listCv: null,
    receiveUser: null,
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
    [fetchCvs.pending]: (state, action) => {
      state.listCv = null
    },
    [fetchCvs.fulfilled]: (state, action) => {
      state.listCv = action.payload
    },

    [deleteCv.fulfilled]: (state, action) => {
      let id = action.payload
      state.listCv = state.listCv.filter((cv) => cv.id !== id)
    },

    [publicCv.fulfilled]: (state, action) => {
      let { id, cvPublic } = action.payload
      let exist = state.listCv.findIndex((cv) => cv.id === id)
      if (exist !== -1) state.listCv[exist].cvPublic = cvPublic
    },

    [getReceiver.pending]: (state, action) => {
      state.receiveUser = null
    },
    [getReceiver.fulfilled]: (state, action) => {
      state.receiveUser = action.payload
    },
  },
})

export const { mergeCv } = listCVSlice.actions

export default listCVSlice.reducer
