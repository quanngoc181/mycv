import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../util/authenUtil'
const axios = require('axios')

export const fetchInfo = createAsyncThunk('info/fetchInfo', async (arg, { rejectWithValue }) => {
  try {
    let ret = await axios.get('http://localhost:8080/users/current/info', { headers: GetToken() })
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateInfo = createAsyncThunk('info/updateInfo', async (arg, { getState, rejectWithValue }) => {
  try {
    let language = getState().info.language
    let viInfo = getState().info.viInfo
    let enInfo = getState().info.enInfo

    if (language === 'vi') viInfo = { ...viInfo, ...arg }
    else if (language === 'en') enInfo = { ...enInfo, ...arg }
    else return rejectWithValue('Ngôn ngữ không hợp lệ')

    let ret = await axios.put('http://localhost:8080/users/current/info', { viInfo, enInfo }, { headers: GetToken() })
    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    viInfo: null,
    enInfo: null,
    language: 'vi',
    updateStatus: null,
  },
  reducers: {
    resetUser(state, action) {
      state.viInfo = null
      state.enInfo = null
    },
    resetStatus(state, action) {
      state.updateStatus = null
    },
    updateAvatar(state, action) {
      state.viInfo.avatar = action.payload
      state.enInfo.avatar = action.payload
    },
    updateLanguage(state, action) {
      let { language } = action.payload
      state.language = language
    },
  },
  extraReducers: {
    [fetchInfo.pending]: (state, action) => {
      state.viInfo = null
      state.enInfo = null
    },
    [fetchInfo.fulfilled]: (state, action) => {
      state.viInfo = action.payload.viInfo
      state.enInfo = action.payload.enInfo
    },

    [updateInfo.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateInfo.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.viInfo = action.payload.viInfo
      state.enInfo = action.payload.enInfo
    },
    [updateInfo.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },
  },
})

export const { resetUser, resetStatus, updateAvatar, updateLanguage } = infoSlice.actions

export default infoSlice.reducer
