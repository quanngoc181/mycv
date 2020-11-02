import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from './postSlice'

export function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addPostStatus, setAddPostStatus] = useState('idle')

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleUserChange = (e) => {
    setUserId(e.target.value)
  }

  const canAdd = title && content && userId && addPostStatus === 'idle'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canAdd) {
      try {
        setAddPostStatus('pending')
        let result = dispatch(addPost({ title, content, userId }))
        unwrapResult(result)
        setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.log(error)
      } finally {
        setAddPostStatus('idle')
      }
    }
  }

  return (
    <>
      <h2>Add a New Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' value={title} onChange={handleTitleChange} />
        </Form.Group>
        <Form.Group controlId='formContent'>
          <Form.Label>Content</Form.Label>
          <Form.Control as='textarea' rows={3} value={content} onChange={handleContentChange} />
        </Form.Group>
        <Form.Group controlId='formUser'>
          <Form.Label>User</Form.Label>
          <Form.Control as='select' value={userId} onChange={handleUserChange}>
            <option value=''></option>
            {user.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>
        <Button type='submit' disabled={!canAdd}>Save Post</Button>
      </Form>
    </>
  )
}
