import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [
      { id: 1, title: 'Title 1', content: 'Content 1', done: true },
      { id: 2, title: 'Title 2', content: 'Content 2', done: false },
      { id: 3, title: 'Title 3', content: 'Content 3', done: true },
    ],
  },
  reducers: {
    addTodo: {
      prepare(title, content) {
        return {
          payload: { id: 0, title, content, done: false },
        }
      },
      reducer(state, action) {
        let lastId = state.items[state.items.length - 1].id
        action.payload.id = lastId + 1
        state.items.push(action.payload)
      },
    },
    toggleStatus(state, action) {
      let todo = state.items.find((todo) => todo.id === action.payload.id)
      if (todo) todo.done = !todo.done
    },
    deleteTodo(state, action) {
      let index = state.items.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.items.splice(index, 1)
    },
    updateTodo(state, action) {
      let todo = state.items.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
        todo.content = action.payload.content
      }
    },
  },
})

export const { addTodo, toggleStatus, deleteTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer
