import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../util/authenUtil'
const axios = require('axios')

export const loginUser = createAsyncThunk('user/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/login', { username, password })
    return response.headers
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const fetchUser = createAsyncThunk('user/fetchUser', async (arg, { rejectWithValue }) => {
  try {
    let res = await axios.get('http://localhost:8080/users/current', { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const register = createAsyncThunk('user/register', async ({ fullName, email, username, password, role }, { rejectWithValue }) => {
  try {
    let user = await axios.post('http://localhost:8080/users', { fullName, email, username, password, role })
    return user.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const confirmEmail = createAsyncThunk('user/confirmEmail', async ({ cet }, { rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/users/confirm-email?cet=' + cet)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const changePassword = createAsyncThunk('user/changePassword', async ({ oldpassword, newpassword }, { rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/users/change-password', { oldpassword, newpassword }, { headers: GetToken() })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const forgotPassword = createAsyncThunk('user/forgotPassword', async ({ username }, { rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/users/forgot-password?username=' + username)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const resetPassword = createAsyncThunk('user/resetPassword', async ({ newpassword, token }, { rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/users/reset-password', { newpassword, token })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loginStatus: null,
    confirmStatus: null,
    registerStatus: null,
    registerError: '',
    changeStatus: null,
    changeError: '',
    forgotStatus: null,
    forgotError: '',
    resetStatus: null,
    resetError: '',
  },
  reducers: {
    resetToken(state, action) {
      localStorage.removeItem('my-cv-token')
    },
    resetRegisterStatus(state, action) {
      state.registerStatus = null
    },
    resetLoginStatus(state, action) {
      state.loginStatus = null
    },
    resetChangeStatus(state, action) {
      state.changeStatus = null
    },
    resetForgotStatus(state, action) {
      state.forgotStatus = null
    },
    resetResetStatus(state, action) {
      state.resetStatus = null
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.user = null
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [fetchUser.rejected]: (state, action) => {
      state.user = null
    },

    [register.pending]: (state, action) => {
      state.registerStatus = 'pending'
    },
    [register.fulfilled]: (state, action) => {
      state.registerStatus = 'success'
    },
    [register.rejected]: (state, action) => {
      state.registerStatus = 'error'
      state.registerError = action.payload.message
    },

    [loginUser.pending]: (state, action) => {
      state.loginStatus = 'pending'
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem('my-cv-token', action.payload.token)
      state.loginStatus = 'success'
    },
    [loginUser.rejected]: (state, action) => {
      localStorage.removeItem('my-cv-token')
      state.loginStatus = 'error'
    },

    [confirmEmail.pending]: (state, action) => {
      state.confirmStatus = 'pending'
    },
    [confirmEmail.fulfilled]: (state, action) => {
      state.confirmStatus = 'success'
    },

    [changePassword.pending]: (state, action) => {
      state.changeStatus = 'pending'
    },
    [changePassword.fulfilled]: (state, action) => {
      state.changeStatus = 'success'
    },
    [changePassword.rejected]: (state, action) => {
      state.changeStatus = 'error'
      state.changeError = action.payload.message
    },

    [forgotPassword.pending]: (state, action) => {
      state.forgotStatus = 'pending'
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.forgotStatus = 'success'
    },
    [forgotPassword.rejected]: (state, action) => {
      state.forgotStatus = 'error'
      state.forgotError = action.payload.message
    },

    [resetPassword.pending]: (state, action) => {
      state.resetStatus = 'pending'
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.resetStatus = 'success'
    },
    [resetPassword.rejected]: (state, action) => {
      state.resetStatus = 'error'
      state.resetError = action.payload.message
    },
  },
})

export const { resetToken, resetLoginStatus, resetRegisterStatus, resetChangeStatus, resetForgotStatus, resetResetStatus } = userSlice.actions

export default userSlice.reducer
