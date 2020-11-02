import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/post/postSlice'
import userReducer from '../features/user/userSlice'
import notificationSlice from '../features/notification/notificationSlice'

export default configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    notification: notificationSlice,
  },
})
