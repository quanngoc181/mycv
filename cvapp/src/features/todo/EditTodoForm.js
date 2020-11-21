import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { updateTodo } from './todoSlice'
import { Button, Form, Input } from 'antd'

export function EditTodoForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()
  const { todoId } = useParams()

  const todo = useSelector((state) => state.todo.items.find((t) => t.id + '' === todoId))
  useEffect(() => {
    form.setFieldsValue({ title: todo.title, content: todo.content })
  }, [form, todo])

  const onFinish = (values) => {
    let title = values.title.trim()
    let content = values.content.trim()

    dispatch(updateTodo({ id: todo.id, title, content }))

    form.resetFields()

    history.push('/todos')
  }

  return (
    <div style={{ padding: '0px 200px' }}>
      <Form form={form} onFinish={onFinish} className='my-5'>
        <Form.Item name='title'>
          <Input type='text' placeholder='Title' />
        </Form.Item>

        <Form.Item name='content'>
          <Input type='text' placeholder='Content' />
        </Form.Item>

        <Button type='primary' htmlType='submit'>
          Update
        </Button>
      </Form>
    </div>
  )
}
