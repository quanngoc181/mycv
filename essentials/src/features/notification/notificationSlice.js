import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchNotifications = createAsyncThunk('notification/fetchNotifications', async (_, { getState }) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  await sleep(1000)

  return [
    { id: '1', message: 'Notification 1', userId: '1', date: '2020-10-24T06:22:40.108Z' },
    { id: '2', message: 'Notification 2', userId: '2', date: '2020-10-23T06:22:40.108Z' },
    { id: '3', message: 'Notification 2', userId: '3', date: '2020-10-22T06:22:40.108Z' },
  ]
})

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    },
  },
})

export default notificationSlice.reducer

export const selectAllNotification = (state) => state.notification
