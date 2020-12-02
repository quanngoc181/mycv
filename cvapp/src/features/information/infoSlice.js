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

export const updateProfile = createAsyncThunk('user/updateProfile', async ({ position, profile }, { getState, rejectWithValue }) => {
  try {
    let info = getState().info.user

    let account = await axios.put('http://localhost:8080/user-info', { ...info, position, profile }, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updatePersonal = createAsyncThunk('user/updatePersonal', async ({ fullName, childs, address, nationality, religion, gender, marital, dob }, { getState, rejectWithValue }) => {
  try {
    let info = getState().info.user

    let account = await axios.put('http://localhost:8080/user-info', { ...info, fullName, childs, address, nationality, religion, gender, marital, dob }, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateContact = createAsyncThunk('user/updateContact', async ({ email, phone, socials }, { getState, rejectWithValue }) => {
  try {
    let info = getState().info.user

    let account = await axios.put('http://localhost:8080/user-info', { ...info, email, phone, socials }, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateAdditional = createAsyncThunk('user/updateAdditional', async ({ additional, activities, hobbies }, { getState, rejectWithValue }) => {
  try {
    let info = getState().info.user

    let account = await axios.put('http://localhost:8080/user-info', { ...info, additional, activities, hobbies }, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateSkills = createAsyncThunk('user/updateSkills', async ({ skills }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/skills', skills, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateScholarships = createAsyncThunk('user/updateScholarships', async ({ scholarships }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/scholarships', scholarships, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateAwards = createAsyncThunk('user/updateAwards', async ({ awards }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/awards', awards, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateCertificates = createAsyncThunk('user/updateCertificates', async ({ certificates }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/certificates', certificates, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateMemberships = createAsyncThunk('user/updateMemberships', async ({ memberships }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/memberships', memberships, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateTheses = createAsyncThunk('user/updateTheses', async ({ theses }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/theses', theses, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updatePresentations = createAsyncThunk('user/updatePresentations', async ({ presentations }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/presentations', presentations, { headers: GetToken() })
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
    updateAvatar(state, action) {
      state.user.avatar = action.payload
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
    [updateProfile.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [updatePersonal.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [updateContact.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [updateAdditional.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [updateSkills.fulfilled]: (state, action) => {
      state.user.skills = action.payload
    },
    [updateScholarships.fulfilled]: (state, action) => {
      state.user.scholarships = action.payload
    },
    [updateAwards.fulfilled]: (state, action) => {
      state.user.awards = action.payload
    },
    [updateCertificates.fulfilled]: (state, action) => {
      state.user.certificates = action.payload
    },
    [updateMemberships.fulfilled]: (state, action) => {
      state.user.memberships = action.payload
    },
    [updateTheses.fulfilled]: (state, action) => {
      state.user.theses = action.payload
    },
    [updatePresentations.fulfilled]: (state, action) => {
      state.user.presentations = action.payload
    },
  },
})

export const { resetUser, updateAvatar } = infoSlice.actions

export default infoSlice.reducer
