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
    let isEditting = getState().create.isEditting

    let body = {
      ...cvInfo,
      activities: JSON.stringify(cvInfo.activities),
      hobbies: JSON.stringify(cvInfo.hobbies),
      books: JSON.stringify(cvInfo.books),
      journals: JSON.stringify(cvInfo.journals),
      presentations: JSON.stringify(cvInfo.presentations),
      orders: JSON.stringify(cvInfo.orders),
      subs: JSON.stringify(cvInfo.subs),
      tags: JSON.stringify(cvInfo.tags),
    }

    let res
    if (!isEditting) {
      body = JSON.parse(JSON.stringify(body).replaceAll('"id":', '"unknown":'))
      res = await axios.post('http://localhost:8080/cv', body, { headers: GetToken() })
    } else {
      res = await axios.put('http://localhost:8080/cv', body, { headers: GetToken() })
    }

    let cv = res.data

    let parsed = {
      ...cv,
      activities: JSON.parse(cv.activities),
      hobbies: JSON.parse(cv.hobbies),
      books: JSON.parse(cv.books),
      journals: JSON.parse(cv.journals),
      presentations: JSON.parse(cv.presentations),
      orders: JSON.parse(cv.orders),
      subs: JSON.parse(cv.subs),
      tags: JSON.parse(cv.tags),
    }

    dispatch(mergeCv({ cv }))

    return parsed
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateTemplate = createAsyncThunk('create/updateTemplate', async (config, { getState }) => {
  let viUser = getState().info.viUser
  let enUser = getState().info.enUser
  return { config, viUser, enUser }
})

export const editCvInfo = createAsyncThunk('create/editCvInfo', async ({ id }, { getState }) => {
  let cv = getState().list.listCv.find((c) => c.id === id)
  return cv
})

export const copyCvInfo = createAsyncThunk('create/copyCvInfo', async ({ id }, { getState }) => {
  let cv = getState().list.listCv.find((c) => c.id === id)
  return cv
})

export const copyCvConfig = createAsyncThunk('create/copyCvConfig', async ({ id }, { getState }) => {
  let cv = getState().list.listCv.find((c) => c.id === id)
  let viUser = getState().info.viUser
  let enUser = getState().info.enUser
  let info = cv.language === 'vi' ? viUser : enUser
  return { cv, info }
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

export const searchTag = createAsyncThunk('create/searchTag', async ({ value }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/es/search-tag/' + value, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const createCVSlice = createSlice({
  name: 'create',
  initialState: {
    cvInfo: null,
    isEditting: false,
    updateStatus: null,
    suggestTag: [],
    suggestStatus: null,
  },
  reducers: {
    resetStatus(state, action) {
      state.updateStatus = null
    },
    initCvInfo(state, action) {
      state.isEditting = false

      state.cvInfo = {
        cvName: 'My CV',
        cvNote: null,
        citation: 'apa',
        language: 'vi',
        cvPublic: true,
        tags: [],
      }
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

      if (state.cvInfo[field].length > 1) {
        state.cvInfo[field].splice(index, 1)
      } else {
        if (['activities', 'hobbies', 'books', 'journals', 'presentations'].includes(field)) {
          state.cvInfo[field] = [null]
        } else {
          state.cvInfo[field] = [{}]
        }
      }
    },
  },
  extraReducers: {
    [updateTemplate.fulfilled]: (state, action) => {
      let { config, viUser, enUser } = action.payload

      let info = state.cvInfo.language === 'vi' ? viUser : enUser

      if (!state.cvInfo.template) {
        // first time choose template
        let mappedInfo = {
          ...state.cvInfo,
          ...config,
          ...info,
          avatar: info.avatar ? info.avatar : 'default-avatar.png',
          gender: info.gender ? genders[state.cvInfo.language][info.gender] : null,
          dob: info.dob ? moment(info.dob).format('DD/MM/YYYY') : null,
          marital: info.marital ? maritals[state.cvInfo.language][info.marital] : null,
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

        state.cvInfo = mappedInfo
      } else {
        // change template
        state.cvInfo = {
          ...state.cvInfo,
          ...config,
        }
      }
    },

    [updateLanguage.fulfilled]: (state, action) => {
      let { info, language } = action.payload

      let mappedInfo = {
        ...state.cvInfo,
        ...info,
        language,
        avatar: info.avatar ? info.avatar : 'default-avatar.png',
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

      state.cvInfo = mappedInfo
    },

    [updateCitation.fulfilled]: (state, action) => {
      let { info, citation } = action.payload
      state.cvInfo.citation = citation
      state.cvInfo.books = info.books.map((book) => buildBook(book, citation))
      state.cvInfo.journals = info.journals.map((journal) => buildJournal(journal, citation))
      state.cvInfo.presentations = info.presentations.map((presentation) => buildPresentation(presentation))
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
        orders: JSON.parse(info.orders),
        subs: JSON.parse(info.subs),
        tags: JSON.parse(info.tags),
      }

      state.cvInfo = mappedInfo
    },

    [copyCvInfo.fulfilled]: (state, action) => {
      state.isEditting = false

      let cv = action.payload

      let mappedInfo = {
        ...cv,
        activities: JSON.parse(cv.activities),
        hobbies: JSON.parse(cv.hobbies),
        books: JSON.parse(cv.books),
        journals: JSON.parse(cv.journals),
        presentations: JSON.parse(cv.presentations),
        orders: JSON.parse(cv.orders),
        subs: JSON.parse(cv.subs),
        tags: JSON.parse(cv.tags),
      }

      state.cvInfo = mappedInfo
    },

    [copyCvConfig.fulfilled]: (state, action) => {
      state.isEditting = false

      let { info, cv } = action.payload

      let mappedInfo = {
        ...cv,
        orders: JSON.parse(cv.orders),
        subs: JSON.parse(cv.subs),
        tags: JSON.parse(cv.tags),
        ...info,
        avatar: info.avatar ? info.avatar : 'default-avatar.png',
        gender: info.gender ? genders[cv.language][info.gender] : null,
        dob: info.dob ? moment(info.dob).format('DD/MM/YYYY') : null,
        marital: info.marital ? maritals[cv.language][info.marital] : null,
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
        books: info.books.map((book) => buildBook(book, cv.citation)),
        journals: info.journals.map((journal) => buildJournal(journal, cv.citation)),
        presentations: info.presentations.map((presentation) => buildPresentation(presentation)),
      }

      state.cvInfo = mappedInfo
    },

    [updateCv.pending]: (state, action) => {
      state.updateStatus = 'pending'
    },
    [updateCv.fulfilled]: (state, action) => {
      state.updateStatus = 'success'
      state.cvInfo = action.payload
      state.isEditting = true
    },
    [updateCv.rejected]: (state, action) => {
      state.updateStatus = 'error'
    },

    [searchTag.pending]: (state, action) => {
      state.suggestStatus = 'pending'
    },
    [searchTag.fulfilled]: (state, action) => {
      state.suggestTag = action.payload.hits.hits.map((o) => o._source)
      state.suggestStatus = 'success'
    },
    [searchTag.rejected]: (state, action) => {
      state.suggestStatus = 'error'
    },
  },
})

export const { initCvInfo, updateCvInfo, addCvInfo, deleteCvInfo, resetStatus } = createCVSlice.actions

export default createCVSlice.reducer
