import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/authentication/userSlice'
import infoReducer from '../features/information/infoSlice'
import createCVReducer from '../features/create-cv/createCVSlice'
import listCVReducer from '../features/list-cv/listCVSlice'
import viewCVReducer from '../features/view-cv/viewCVSlice'
import findCVReducer from '../features/find-cv/findCVSlice'
import saveCVReducer from '../features/save-cv/saveCVSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    info: infoReducer,
    create: createCVReducer,
    list: listCVReducer,
    view: viewCVReducer,
    find: findCVReducer,
    save: saveCVReducer,
  },
})
