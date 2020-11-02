import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addTodo } from './todoSlice'

export function AddTodoForm() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(addTodo({ title, content }))

    setTitle('')
    setContent('')
  }

  return (
    <Form>
      <Form.Group controlId='title'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' value={title} onChange={handleTitleChange} />
      </Form.Group>

      <Form.Group controlId='content'>
        <Form.Label>Content</Form.Label>
        <Form.Control type='text' value={content} onChange={handleContentChange} />
      </Form.Group>

      <Button variant='outline-primary' size='sm' type='submit' onClick={handleSubmit}>
        Create
      </Button>
    </Form>
  )
}
