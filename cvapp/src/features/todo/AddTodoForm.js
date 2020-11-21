import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from './todoSlice'

export function AddTodoForm() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = (values) => {
    let title = values.title.trim()
    let content = values.content.trim()

    dispatch(addTodo({ title, content }))

    form.resetFields()
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name='title'>
        <Input type='text' placeholder='Title' />
      </Form.Item>

      <Form.Item name='content'>
        <Input type='text' placeholder='Content' />
      </Form.Item>

      <Button type='primary' htmlType='submit'>
        Create
      </Button>
    </Form>
  )
}
