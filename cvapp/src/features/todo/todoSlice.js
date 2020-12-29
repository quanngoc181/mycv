import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetToken } from '../../util/authenUtil'
const axios = require('axios')

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async (arg, { rejectWithValue }) => {
  try {
    let todos = await axios.get('http://localhost:8080/todo', { headers: GetToken() })
    return todos.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const addTodo = createAsyncThunk('todo/addTodo', async ({ title, content }) => {
  let todos = await axios.post('http://localhost:8080/todo', { title, content }, { headers: GetToken() })
  return todos.data
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async ({ id }, { rejectWithValue }) => {
  try {
    let todos = await axios.delete('http://localhost:8080/todo/' + id, { headers: GetToken() })
    return todos.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const toggleTodo = createAsyncThunk('todo/toggleTodo', async ({ id }, { getState }) => {
  let todo = getState().todo.items.find((td) => td.id === id)
  if (!todo) return

  let todos = await axios.put('http://localhost:8080/todo', { ...todo, done: !todo.done }, { headers: GetToken() })
  return todos.data
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async ({ id, title, content }, { getState }) => {
  let todo = getState().todo.items.find((td) => td.id === id)
  if (!todo) return

  let todos = await axios.put('http://localhost:8080/todo', { ...todo, title, content }, { headers: GetToken() })
  return todos.data
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [],
  },
  reducers: {
    updateTodo(state, action) {
      let todo = state.items.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
        todo.content = action.payload.content
      }
    },
  },
  extraReducers: {
    [fetchTodo.fulfilled]: (state, action) => {
      state.items = action.payload
    },
    [fetchTodo.rejected]: (state, action) => {
      console.log(action.payload)
    },
    [addTodo.fulfilled]: (state, action) => {
      state.items.push(action.payload)
    },
    [deleteTodo.fulfilled]: (state, action) => {
      let index = state.items.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.items.splice(index, 1)
    },
    [deleteTodo.rejected]: (state, action) => {
      console.log(action.payload)
    },
    [toggleTodo.fulfilled]: (state, action) => {
      let item = state.items.find((todo) => todo.id === action.payload.id)
      if (item) item.done = action.payload.done
    },
    [updateTodo.fulfilled]: (state, action) => {
      let index = state.items.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.items.splice(index, 1, action.payload)
    },
  },
})

// export const {} = todoSlice.actions

export default todoSlice.reducer
