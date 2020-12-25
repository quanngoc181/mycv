import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../utilities/authenUtility'
const axios = require('axios')

export const fetchSaved = createAsyncThunk('create/fetchSaved', async (arg, { rejectWithValue }) => {
  try {
    let res = await axios.get('http://localhost:8080/save', { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const saveCv = createAsyncThunk('create/saveCv', async ({ cvId }, { rejectWithValue }) => {
  try {
    let res = await axios.post('http://localhost:8080/save/' + cvId, {}, { headers: GetToken() })
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const saveCVSlice = createSlice({
  name: 'save',
  initialState: {
    savedCv: [],
  },
  reducers: {},
  extraReducers: {
    [fetchSaved.fulfilled]: (state, action) => {
      state.savedCv = action.payload
    },
    [saveCv.fulfilled]: (state, action) => {
      let cv = action.payload
      let exist = state.savedCv.findIndex((s) => s.cvId === cv.cvId)

      if (exist === -1) {
        state.savedCv.push(cv)
      } else {
        state.savedCv.splice(exist, 1)
      }
    },
  },
})

// export const {} = saveCVSlice.actions

export default saveCVSlice.reducer
