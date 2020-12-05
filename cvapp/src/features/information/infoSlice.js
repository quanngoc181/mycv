import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../utilities/authenUtility'
import moment from 'moment'
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

export const updateBooks = createAsyncThunk('user/updateBooks', async ({ books }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/books', books, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateJournals = createAsyncThunk('user/updateJournals', async ({ journals }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/journals', journals, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateEducations = createAsyncThunk('user/updateEducations', async ({ educations }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/educations', educations, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateWorks = createAsyncThunk('user/updateWorks', async ({ works }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/works', works, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateProjects = createAsyncThunk('user/updateProjects', async ({ projects }, { rejectWithValue }) => {
  try {
    let account = await axios.put('http://localhost:8080/user-info/projects', projects, { headers: GetToken() })
    return account.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    user: null,
    updateStatus: 'pending',
  },
  reducers: {
    resetUser(state, action) {
      state.user = null
    },
    resetStatus(state, action) {
      state.updateStatus = 'pending'
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

    [updateProfile.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user = action.payload
    },
    [updateProfile.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updatePersonal.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updatePersonal.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user = action.payload
    },
    [updatePersonal.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateContact.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateContact.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user = action.payload
    },
    [updateContact.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateAdditional.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateAdditional.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user = action.payload
    },
    [updateAdditional.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateSkills.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateSkills.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.skills = action.payload
    },
    [updateSkills.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateScholarships.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateScholarships.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.scholarships = action.payload
    },
    [updateScholarships.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateAwards.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateAwards.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.awards = action.payload
    },
    [updateAwards.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateCertificates.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateCertificates.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.certificates = action.payload
    },
    [updateCertificates.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateMemberships.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateMemberships.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.memberships = action.payload
    },
    [updateMemberships.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateTheses.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateTheses.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.theses = action.payload
    },
    [updateTheses.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updatePresentations.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updatePresentations.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.presentations = action.payload
    },
    [updatePresentations.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateBooks.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateBooks.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.books = action.payload
    },
    [updateBooks.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateJournals.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateJournals.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.journals = action.payload
    },
    [updateJournals.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateEducations.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateEducations.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.educations = action.payload
    },
    [updateEducations.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateWorks.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateWorks.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.works = action.payload
    },
    [updateWorks.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [updateProjects.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateProjects.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.user.projects = action.payload
    },
    [updateProjects.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },
  },
})

export const { resetUser, resetStatus, updateAvatar } = infoSlice.actions

const maritals = {
  single: 'Độc thân',
  married: 'Kết hôn',
  divorced: 'Ly hôn',
  widowed: 'Góa',
}

export const displayInfo = (state) => {
  let info = state.info.user
  if (info === null) return null
  return {
    ...info,
    avatar: info.avatar ? info.avatar : 'default-avatar.png',
    gender: info.gender === 'male' ? 'Nam' : info.gender === 'female' ? 'Nữ' : null,
    dob: info.dob ? moment(info.dob).format('DD/MM/YYYY') : null,
    marital: maritals[info.marital],
    socials: info.socials ? JSON.parse(info.socials) : [],
    activities: info.activities ? JSON.parse(info.activities) : [],
    hobbies: info.hobbies ? JSON.parse(info.hobbies) : [],
    educations: info.educations.map((education) => ({
      ...education,
      start: education.start ? moment(education.start).format('MM/YYYY') : null,
      end: education.end ? moment(education.end).format('MM/YYYY') : null,
      description: education.description ? education.description.split('\n') : [],
    })),
    works: info.works.map((work) => ({
      ...work,
      start: work.start ? moment(work.start).format('MM/YYYY') : null,
      end: work.end ? moment(work.end).format('MM/YYYY') : null,
      description: work.description ? work.description.split('\n') : [],
    })),
    projects: info.projects.map((project) => ({
      ...project,
      start: project.start ? moment(project.start).format('MM/YYYY') : null,
      end: project.end ? moment(project.end).format('MM/YYYY') : null,
      description: project.description ? project.description.split('\n') : [],
    })),
    memberships: info.memberships.map((membership) => ({
      ...membership,
      start: membership.start ? moment(membership.start).format('MM/YYYY') : null,
      end: membership.end ? moment(membership.end).format('MM/YYYY') : null,
    })),
    theses: info.theses.map((thesis) => ({
      ...thesis,
      description: thesis.description ? thesis.description.split('\n') : [],
    })),
    books: ['Day la cuon sach thu nhat', 'Day la cuon sach thu hai'],
    journals: ['Day la tap chi thu nhat', 'Day la tap chi thu hai'],
    presentations: ['Day la thuyet trinh thu nhat', 'Day la thuyet trinh thu hai'],
  }
}

export default infoSlice.reducer
