import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { GetToken } from '../../utilities/authenUtility'
import { mergeCv } from '../list-cv/listCVSlice'
const axios = require('axios')

const maritals = {
  single: 'Độc thân',
  married: 'Kết hôn',
  divorced: 'Ly hôn',
  widowed: 'Góa',
}

export const updateCv = createAsyncThunk('create/updateCv', async (arg, { dispatch, getState, rejectWithValue }) => {
  try {
    let cvInfo = getState().create.cvInfo

    let res = await axios.post(
      'http://localhost:8080/cv-info',
      {
        ...cvInfo,
        activities: JSON.stringify(cvInfo.activities),
        hobbies: JSON.stringify(cvInfo.hobbies),
        books: JSON.stringify(cvInfo.books),
        journals: JSON.stringify(cvInfo.journals),
        presentations: JSON.stringify(cvInfo.presentations),
      },
      { headers: GetToken() }
    )

    let data = res.data

    let parsed = {
      ...data,
      activities: JSON.parse(data.activities),
      hobbies: JSON.parse(data.hobbies),
      books: JSON.parse(data.books),
      journals: JSON.parse(data.journals),
      presentations: JSON.parse(data.presentations),
    }

    dispatch(mergeCv({ cv: data }))

    return parsed
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const initCvInfo = createAsyncThunk('create/initCvInfo', async (arg, { getState }) => {
  let info = getState().info.user
  return info
})

export const editCvInfo = createAsyncThunk('create/editCvInfo', async ({ id }, { getState }) => {
  let info = getState().list.listCv.find((cv) => cv.id === id)
  return info
})

export const createCVSlice = createSlice({
  name: 'create',
  initialState: {
    cvInfo: null,
    updateStatus: null,
  },
  reducers: {
    resetStatus(state, action) {
      state.updateStatus = null
    },
    updateTemplate(state, action) {
      state.cvInfo.template = action.payload.template
    },
    updateLanguage(state, action) {
      state.cvInfo.language = action.payload.language
    },
    updateFontFamily(state, action) {
      state.cvInfo.fontFamily = action.payload.fontFamily
    },
    updateFontSize(state, action) {
      state.cvInfo.fontSize = action.payload.fontSize
    },
    updateLineHeight(state, action) {
      state.cvInfo.lineHeight = action.payload.lineHeight
    },
    updateCvInfo(state, action) {
      let { field, index, subfield, value } = action.payload
      if (subfield) {
        state.cvInfo[field][index][subfield] = value
      } else if (index) {
        state.cvInfo[field][index] = value
      } else {
        state.cvInfo[field] = value
      }
    },
  },
  extraReducers: {
    [initCvInfo.fulfilled]: (state, action) => {
      let info = action.payload
      let mappedInfo = {
        cvName: 'MYCV',
        cvNote: null,
        template: 'template1',
        language: 'vi',
        fontFamily: 'arial',
        fontSize: 11,
        lineHeight: 1.4,
        ...info,
        avatar: info.avatar ? info.avatar : 'default-avatar.png',
        gender: info.gender === 'male' ? 'Nam' : info.gender === 'female' ? 'Nữ' : null,
        dob: info.dob ? moment(info.dob).format('DD/MM/YYYY') : null,
        marital: maritals[info.marital],
        socials: info.socials ? JSON.parse(info.socials).join('\n') : null,
        activities: info.activities ? JSON.parse(info.activities) : [],
        hobbies: info.hobbies ? JSON.parse(info.hobbies) : [],
        educations: info.educations.map((education) => ({
          ...education,
          start: education.start ? moment(education.start).format('MM/YYYY') : null,
          end: education.end ? moment(education.end).format('MM/YYYY') : null,
        })),
        works: info.works.map((work) => ({
          ...work,
          start: work.start ? moment(work.start).format('MM/YYYY') : null,
          end: work.end ? moment(work.end).format('MM/YYYY') : null,
        })),
        projects: info.projects.map((project) => ({
          ...project,
          start: project.start ? moment(project.start).format('MM/YYYY') : null,
          end: project.end ? moment(project.end).format('MM/YYYY') : null,
        })),
        memberships: info.memberships.map((membership) => ({
          ...membership,
          start: membership.start ? moment(membership.start).format('MM/YYYY') : null,
          end: membership.end ? moment(membership.end).format('MM/YYYY') : null,
        })),
        books: ['Day la cuon sach thu nhat', 'Day la cuon sach thu hai'],
        journals: ['Day la tap chi thu nhat', 'Day la tap chi thu hai'],
        presentations: ['Day la thuyet trinh thu nhat', 'Day la thuyet trinh thu hai'],
      }

      let removedId = JSON.parse(JSON.stringify(mappedInfo).replaceAll('"id":', '"unknown":'))

      state.cvInfo = removedId
    },

    [editCvInfo.fulfilled]: (state, action) => {
      let info = action.payload
      let mappedInfo = {
        ...info,
        activities: JSON.parse(info.activities),
        hobbies: JSON.parse(info.hobbies),
        books: JSON.parse(info.books),
        journals: JSON.parse(info.journals),
        presentations: JSON.parse(info.presentations),
      }
      state.cvInfo = mappedInfo
    },

    [updateCv.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateCv.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.cvInfo = action.payload
    },
    [updateCv.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },
  },
})

export const { updateCvInfo, updateTemplate, updateLanguage, updateFontFamily, updateFontSize, updateLineHeight, resetStatus } = createCVSlice.actions

export default createCVSlice.reducer
