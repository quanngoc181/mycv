import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../utilities/authenUtility'
const axios = require('axios')

export const fetchAccount = createAsyncThunk('info/fetchAccount', async (arg, { rejectWithValue }) => {
  try {
    let account = await axios.get('http://localhost:8080/user-info', { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateInfo = createAsyncThunk('info/updateInfo', async (arg, { getState, rejectWithValue }) => {
  try {
    let language = getState().info.language
    let viUser = getState().info.viUser
    let enUser = getState().info.enUser
    let info = language === 'vi' ? viUser : enUser
    let account = await axios.put('http://localhost:8080/user-info', { ...info, ...arg }, { headers: GetToken() })
    return { language, data: account.data }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    viUser: null,
    enUser: null,
    language: 'vi',
    updateStatus: 'pending',
  },
  reducers: {
    resetUser(state, action) {
      state.viUser = null
      state.enUser = null
    },
    resetStatus(state, action) {
      state.updateStatus = 'pending'
    },
    updateAvatar(state, action) {
      state.viUser.avatar = action.payload
      state.enUser.avatar = action.payload
    },
    updateLanguage(state, action) {
      let { language } = action.payload
      state.language = language
    },
  },
  extraReducers: {
    [fetchAccount.pending]: (state, action) => {
      state.viUser = null
      state.enUser = null
    },
    [fetchAccount.fulfilled]: (state, action) => {
      state.viUser = action.payload.find((info) => info.language === 'vi')
      state.enUser = action.payload.find((info) => info.language === 'en')
    },
    [fetchAccount.rejected]: (state, action) => {
      state.viUser = null
      state.enUser = null
    },

    [updateInfo.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateInfo.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      let { language, data } = action.payload
      if (language === 'vi') state.viUser = data
      else state.enUser = data
    },
    [updateInfo.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },
  },
})

export const { resetUser, resetStatus, updateAvatar, updateLanguage } = infoSlice.actions

export default infoSlice.reducer
