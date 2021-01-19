import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../util/authenUtil'
const axios = require('axios')

export const searchKeyword = createAsyncThunk('create/searchKeyword', async (arg, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/keyword', arg, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const searchFilter = createAsyncThunk('create/searchFilter', async (arg, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/filter', arg, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getSuggest = createAsyncThunk('create/getSuggest', async ({ field, keyword }, { rejectWithValue }) => {
  try {
    let res = await axios.get('http://localhost:8080/suggester/' + field + '?keyword=' + keyword, { headers: GetToken() })
    return { field, res: res.data }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const findCVSlice = createSlice({
  name: 'find',
  initialState: {
    searchPage: 0,
    searchTotal: 0,
    searchResult: [],
    suggestTag: [],
    suggestAddress: [],
    suggestSchool: [],
    suggestField: [],
    suggestCompany: [],
    suggestPosition: [],
    suggestSkill: [],
    searchStatus: null,
  },
  reducers: {},
  extraReducers: {
    [searchFilter.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchFilter.fulfilled]: (state, action) => {
      state.searchPage = action.payload.page
      state.searchTotal = action.payload.total
      state.searchResult = action.payload.result
      state.searchStatus = 'success'
    },
    [searchFilter.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchKeyword.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchKeyword.fulfilled]: (state, action) => {
      state.searchPage = action.payload.page
      state.searchTotal = action.payload.total
      state.searchResult = action.payload.result
      state.searchStatus = 'success'
    },
    [searchKeyword.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [getSuggest.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [getSuggest.fulfilled]: (state, action) => {
      let { field, res } = action.payload
      let stateName = 'suggest' + field[0].toUpperCase() + field.substring(1)
      state[stateName] = res
      state.searchStatus = 'success'
    },
    [getSuggest.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },
  },
})

// export const {} = findCVSlice.actions

export default findCVSlice.reducer
