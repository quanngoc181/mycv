import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import todoSlice from '../features/todo/todoSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoSlice,
  },
})
