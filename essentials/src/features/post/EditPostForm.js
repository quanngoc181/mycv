import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { updatePost, selectPostById } from './postSlice'

export function EditPostForm() {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title && content) {
      dispatch(updatePost({ id: postId, title, content }))
      history.push(`/post/${postId}`)
    }
  }

  return (
    <>
      <h2>Edit a Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' value={title} onChange={handleTitleChange} />
        </Form.Group>
        <Form.Group controlId='formContent'>
          <Form.Label>Content</Form.Label>
          <Form.Control as='textarea' rows={3} value={content} onChange={handleContentChange} />
        </Form.Group>
        <Button type='submit'>Save</Button>
      </Form>
    </>
  )
}
