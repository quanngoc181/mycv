import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { updateTodo } from './todoSlice'

export function EditTodoForm() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { todoId } = useParams()

  const todo = useSelector((state) => state.todo.items.find((t) => t.id + '' === todoId))

  const [title, setTitle] = useState(todo.title)
  const [content, setContent] = useState(todo.content)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateTodo({ id: todo.id, title, content }))

    history.push('/todos')
  }

  return (
    <Container>
      <Form className='mt-5'>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' value={title} onChange={handleTitleChange} />
        </Form.Group>

        <Form.Group controlId='content'>
          <Form.Label>Content</Form.Label>
          <Form.Control type='text' value={content} onChange={handleContentChange} />
        </Form.Group>

        <Button variant='outline-primary' size='sm' type='submit' onClick={handleSubmit}>
          Save
        </Button>
      </Form>
    </Container>
  )
}
