import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../util/authenUtil'
import { formatInfo } from '../../util/dataUtil'
import { buildBook, buildJournal, buildPresentation } from '../../util/citationUtil'
import { mergeCv } from '../list-cv/listCVSlice'
const axios = require('axios')

export const updateCv = createAsyncThunk('create/updateCv', async (arg, { dispatch, getState, rejectWithValue }) => {
  try {
    let cvInfo = getState().create.cvInfo
    let isEditting = getState().create.isEditting

    let ret
    if (!isEditting) {
      ret = await axios.post('http://localhost:8080/users/current/cvs', cvInfo, { headers: GetToken() })
    } else {
      ret = await axios.put('http://localhost:8080/users/current/cvs/' + cvInfo.id, cvInfo, { headers: GetToken() })
    }

    dispatch(mergeCv({ cv: ret.data }))

    return ret.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateTemplate = createAsyncThunk('create/updateTemplate', async (config, { getState }) => {
  let language = getState().create.cvInfo.language
  let viInfo = getState().info.viInfo
  let enInfo = getState().info.enInfo
  let info = language === 'vi' ? viInfo : enInfo
  return { info, config }
})

export const updateLanguage = createAsyncThunk('create/updateLanguage', async ({ language }, { getState }) => {
  let viInfo = getState().info.viInfo
  let enInfo = getState().info.enInfo
  let info = language === 'vi' ? viInfo : enInfo
  return { info, language }
})

export const updateCitation = createAsyncThunk('create/updateCitation', async ({ citation }, { getState }) => {
  let language = getState().create.cvInfo.language
  let viInfo = getState().info.viInfo
  let enInfo = getState().info.enInfo
  let info = language === 'vi' ? viInfo : enInfo
  return { info, citation }
})

export const editCv = createAsyncThunk('create/editCv', async ({ id }, { getState }) => {
  let cv = getState().list.listCv.find((c) => c.id === id)
  return cv
})

export const copyCvAll = createAsyncThunk('create/copyCvAll', async ({ id }, { getState }) => {
  let cv = getState().list.listCv.find((c) => c.id === id)
  return cv
})

export const copyCvTemplate = createAsyncThunk('create/copyCvTemplate', async ({ id }, { getState }) => {
  let cv = getState().list.listCv.find((c) => c.id === id)
  let viInfo = getState().info.viInfo
  let enInfo = getState().info.enInfo
  let info = cv.language === 'vi' ? viInfo : enInfo
  return { cv, info }
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
    initCvInfo(state, action) {
      state.isEditting = false

      state.cvInfo = {
        cvName: null,
        cvNote: null,
        citation: 'apa',
        language: 'vi',
        cvPublic: false,
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
      let { info, config } = action.payload

      let language = state.cvInfo.language
      let citation = state.cvInfo.citation

      if (!state.cvInfo.template) {
        // first time choose template
        let mappedInfo = {
          ...state.cvInfo,
          ...config,
          ...formatInfo(info, language, citation),
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

      let citation = state.cvInfo.citation

      let mappedInfo = {
        ...state.cvInfo,
        ...formatInfo(info, language, citation),
        language,
      }

      state.cvInfo = mappedInfo
    },

    [updateCitation.fulfilled]: (state, action) => {
      let { info, citation } = action.payload

      state.cvInfo.citation = citation

      let books = info.books.map((book) => buildBook(book, citation))
      let journals = info.journals.map((journal) => buildJournal(journal, citation))
      let presentations = info.presentations.map((presentation) => buildPresentation(presentation))

      if (books.length === 0) books = [null]
      if (journals.length === 0) journals = [null]
      if (presentations.length === 0) presentations = [null]

      state.cvInfo.books = books
      state.cvInfo.journals = journals
      state.cvInfo.presentations = presentations
    },

    [editCv.fulfilled]: (state, action) => {
      state.isEditting = true
      state.cvInfo = action.payload
    },

    [copyCvAll.fulfilled]: (state, action) => {
      state.isEditting = false
      state.cvInfo = action.payload
    },

    [copyCvTemplate.fulfilled]: (state, action) => {
      state.isEditting = false

      let { info, cv } = action.payload

      let language = cv.language
      let citation = cv.citation

      let mappedInfo = {
        ...cv,
        ...formatInfo(info, language, citation),
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
  },
})

export const { initCvInfo, updateCvInfo, addCvInfo, deleteCvInfo, resetStatus } = createCVSlice.actions

export default createCVSlice.reducer
