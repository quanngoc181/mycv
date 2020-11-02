import { createAsyncThunk, createSelector, createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  await sleep(2000)

  return [
    { id: '1', title: 'Title 1', content: 'Content 1', userId: '1', date: '2020-10-24T06:22:40.108Z', reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
    { id: '2', title: 'Title 2', content: 'Content 2', userId: '2', date: '2020-10-23T06:22:40.108Z', reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
    { id: '3', title: 'Title 3', content: 'Content 2', userId: '3', date: '2020-10-22T06:22:40.108Z', reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
  ]
})

export const addPost = createAsyncThunk('posts/addPost', async ({ title, content, userId }) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  await sleep(1000)

  return {
    id: nanoid(),
    date: new Date().toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    title,
    content,
    userId,
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePost(state, action) {
      let { id, title, content } = action.payload
      let oldPost = state.posts.find((post) => post.id === id)
      if (oldPost) {
        oldPost.title = title
        oldPost.content = content
      }
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload)
    },
  },
})

export const { updatePost, addReaction } = postSlice.actions

export default postSlice.reducer

export const selectAllPost = (state) => state.post.posts

export const selectPostById = (state, postId) => state.post.posts.find((post) => post.id === postId)

export const selectPostsByUser = createSelector([selectAllPost, (state, userId) => userId], (posts, userId) => posts.filter((post) => post.userId === userId))
