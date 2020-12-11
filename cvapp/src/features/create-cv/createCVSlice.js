import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { GetToken } from '../../utilities/authenUtility'
import { mergeCv } from '../list-cv/listCVSlice'
import { buildBook, buildJournal, buildPresentation } from '../../util/citationUtil'
const axios = require('axios')

const genders = {
  vi: {
    male: 'Nam',
    female: 'Nữ',
  },
  en: {
    male: 'Male',
    female: 'Female',
  },
}
const maritals = {
  vi: {
    single: 'Độc thân',
    married: 'Kết hôn',
    divorced: 'Ly hôn',
    widowed: 'Góa',
  },
  en: {
    single: 'Single',
    married: 'Married',
    divorced: 'Divorced',
    widowed: 'Widowed',
  },
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
  let info = getState().info.viUser
  return info
})

export const editCvInfo = createAsyncThunk('create/editCvInfo', async ({ id }, { getState }) => {
  let info = getState().list.listCv.find((cv) => cv.id === id)
  return info
})

export const updateLanguage = createAsyncThunk('create/updateLanguage', async ({ language }, { getState }) => {
  let viUser = getState().info.viUser
  let enUser = getState().info.enUser
  let info = language === 'vi' ? viUser : enUser
  return { info, language }
})

export const updateCitation = createAsyncThunk('create/updateCitation', async ({ citation }, { getState }) => {
  let language = getState().create.cvInfo.language
  let viUser = getState().info.viUser
  let enUser = getState().info.enUser
  let info = language === 'vi' ? viUser : enUser
  return { info, citation }
})

export const createCVSlice = createSlice({
  name: 'create',
  initialState: {
    cvInfo: null,
    isEditting: false,
    updateStatus: null,
  },
  reducers: {
    resetStatus(state, action) {
      state.updateStatus = null
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
    addCvInfo(state, action) {
      let { field, index } = action.payload

      if (['activities', 'hobbies', 'books', 'journals', 'presentations'].includes(field)) {
        state.cvInfo[field].splice(index + 1, 0, null)
      } else {
        state.cvInfo[field].splice(index + 1, 0, {})
      }
    },
    deleteCvInfo(state, action) {
      let { field, index } = action.payload

      state.cvInfo[field].splice(index, 1)
    },
  },
  extraReducers: {
    [initCvInfo.fulfilled]: (state, action) => {
      state.isEditting = false

      let info = action.payload

      let mappedInfo = {
        cvName: 'MYCV',
        cvNote: null,
        template: 'template1',
        language: 'vi',
        fontFamily: 'arial',
        fontSize: 11,
        lineHeight: 1.4,
        citation: 'apa',
        ...info,
        avatar: info.avatar ? info.avatar : 'default-avatar.png',
        gender: info.gender ? genders['vi'][info.gender] : null,
        dob: info.dob ? moment(info.dob).format('DD/MM/YYYY') : null,
        marital: info.marital ? maritals['vi'][info.marital] : null,
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
        books: info.books.map((book) => buildBook(book, 'apa')),
        journals: info.journals.map((journal) => buildJournal(journal, 'apa')),
        presentations: info.presentations.map((presentation) => buildPresentation(presentation)),
      }

      let removedId = JSON.parse(JSON.stringify(mappedInfo).replaceAll('"id":', '"unknown":'))

      state.cvInfo = removedId
    },

    [updateLanguage.fulfilled]: (state, action) => {
      let { info, language } = action.payload

      let mappedInfo = {
        ...state.cvInfo,
        ...info,
        language,
        gender: info.gender ? genders[language][info.gender] : null,
        dob: info.dob ? moment(info.dob).format('DD/MM/YYYY') : null,
        marital: info.marital ? maritals[language][info.marital] : null,
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
        books: info.books.map((book) => buildBook(book, state.cvInfo.citation)),
        journals: info.journals.map((journal) => buildJournal(journal, state.cvInfo.citation)),
        presentations: info.presentations.map((presentation) => buildPresentation(presentation)),
      }

      let removedId = JSON.parse(JSON.stringify(mappedInfo).replaceAll('"id":', '"unknown":'))

      state.cvInfo = removedId
    },

    [editCvInfo.fulfilled]: (state, action) => {
      state.isEditting = true

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

    [updateCitation.fulfilled]: (state, action) => {
      let { info, citation } = action.payload
      state.cvInfo.citation = citation
      state.cvInfo.books = info.books.map((book) => buildBook(book, citation))
      state.cvInfo.journals = info.journals.map((journal) => buildJournal(journal, citation))
      state.cvInfo.presentations = info.presentations.map((presentation) => buildPresentation(presentation))
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

export const { updateCvInfo, addCvInfo, deleteCvInfo, resetStatus } = createCVSlice.actions

export default createCVSlice.reducer
