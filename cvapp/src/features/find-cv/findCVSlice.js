import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../utilities/authenUtility'
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

export const searchTag = createAsyncThunk('create/searchTag', async ({ value }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/tag/' + value, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const searchAddress = createAsyncThunk('create/searchAddress', async ({ value }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/address/' + value, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const searchSchool = createAsyncThunk('create/searchSchool', async ({ value }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/school/' + value, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const searchField = createAsyncThunk('create/searchField', async ({ value }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/field/' + value, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const searchCompany = createAsyncThunk('create/searchCompany', async ({ value }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/company/' + value, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const searchPosition = createAsyncThunk('create/searchPosition', async ({ value }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/position/' + value, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const searchSkill = createAsyncThunk('create/searchSkill', async ({ value }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/search/skill/' + value, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const findCVSlice = createSlice({
  name: 'find',
  initialState: {
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
      state.searchResult = action.payload
      state.searchStatus = 'success'
    },
    [searchFilter.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchKeyword.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchKeyword.fulfilled]: (state, action) => {
      state.searchResult = action.payload
      state.searchStatus = 'success'
    },
    [searchKeyword.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchTag.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchTag.fulfilled]: (state, action) => {
      state.suggestTag = action.payload.hits.hits.map((o) => o._source)
      state.searchStatus = 'success'
    },
    [searchTag.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchAddress.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchAddress.fulfilled]: (state, action) => {
      state.suggestAddress = action.payload.hits.hits.map((o) => o._source)
      state.searchStatus = 'success'
    },
    [searchAddress.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchSchool.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchSchool.fulfilled]: (state, action) => {
      state.suggestSchool = action.payload.hits.hits.map((o) => o._source)
      state.searchStatus = 'success'
    },
    [searchSchool.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchField.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchField.fulfilled]: (state, action) => {
      state.suggestField = action.payload.hits.hits.map((o) => o._source)
      state.searchStatus = 'success'
    },
    [searchField.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchCompany.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchCompany.fulfilled]: (state, action) => {
      state.suggestCompany = action.payload.hits.hits.map((o) => o._source)
      state.searchStatus = 'success'
    },
    [searchCompany.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchPosition.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchPosition.fulfilled]: (state, action) => {
      state.suggestPosition = action.payload.hits.hits.map((o) => o._source)
      state.searchStatus = 'success'
    },
    [searchPosition.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },

    [searchSkill.pending]: (state, action) => {
      state.searchStatus = 'pending'
    },
    [searchSkill.fulfilled]: (state, action) => {
      state.suggestSkill = action.payload.hits.hits.map((o) => o._source)
      state.searchStatus = 'success'
    },
    [searchSkill.rejected]: (state, action) => {
      state.searchStatus = 'error'
    },
  },
})

// export const {} = findCVSlice.actions

export default findCVSlice.reducer
