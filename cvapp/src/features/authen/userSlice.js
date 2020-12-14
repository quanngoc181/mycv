import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../utilities/authenUtility'
const axios = require('axios')

export const fetchUser = createAsyncThunk('info/fetchUser', async (arg, { rejectWithValue }) => {
  try {
    let res = await axios.get('http://localhost:8080/user', { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const registerUser = createAsyncThunk('user/register', async ({ fullName, email, username, password, role }, { rejectWithValue }) => {
  try {
    let user = await axios.post('http://localhost:8080/user', { fullName, email, username, password, role })
    return user.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const loginUser = createAsyncThunk('user/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    let response = await axios.post('http://localhost:8080/login', { username, password })
    return response.headers
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const confirmEmail = createAsyncThunk('user/confirmEmail', async ({ cet }, { rejectWithValue }) => {
  try {
    let response = await axios.get('http://localhost:8080/confirm-email/' + cet)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const changePassword = createAsyncThunk('user/changePassword', async ({ oldpassword, newpassword }, { rejectWithValue }) => {
  try {
    let response = await axios.put('http://localhost:8080/user/password', { oldpassword, newpassword }, { headers: GetToken() })
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
    registerStatus: null,
    registerError: '',
    confirmStatus: null,
    passwordStatus: null,
    passwordError: '',
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
    resetPasswordStatus(state, action) {
      state.passwordStatus = null
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

    [registerUser.pending]: (state, action) => {
      state.registerStatus = 'pending'
    },
    [registerUser.fulfilled]: (state, action) => {
      state.registerStatus = 'success'
    },
    [registerUser.rejected]: (state, action) => {
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
      state.passwordStatus = 'pending'
    },
    [changePassword.fulfilled]: (state, action) => {
      state.passwordStatus = 'success'
    },
    [changePassword.rejected]: (state, action) => {
      state.passwordStatus = 'error'
      state.passwordError = action.payload.message
    },
  },
})

export const { resetToken, resetLoginStatus, resetRegisterStatus, resetPasswordStatus } = userSlice.actions

export default userSlice.reducer
