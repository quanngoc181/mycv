import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/authen/userSlice'
import infoReducer from '../features/information/infoSlice'
import counterReducer from '../features/counter/counterSlice'
import todoReducer from '../features/todo/todoSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    user: userReducer,
    info: infoReducer,
  },
})
