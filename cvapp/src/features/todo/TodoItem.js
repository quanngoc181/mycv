import React from 'react'
import { List, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTodo, toggleTodo } from './todoSlice'
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons'

export function TodoItem({ todo }) {
  const dispatch = useDispatch()

  const handleToggleStatus = () => {
    dispatch(toggleTodo({ id: todo.id }))
  }

  const handleDelete = () => {
    dispatch(deleteTodo({ id: todo.id }))
  }

  return (
    <List.Item style={{backgroundColor: '#ffffff'}}>
      <div className='d-flex justify-content-between align-items-center' style={{ opacity: todo.done ? 0.5 : 1, width: '100%' }}>
        <div className='content'>
          {todo.done ? <CheckSquareOutlined onClick={handleToggleStatus} /> : <CloseSquareOutlined onClick={handleToggleStatus} />}
          <span> - </span>
          <b>{todo.title}</b>
          <span> - </span>
          <span>{todo.content}</span>
        </div>
        <div className='action'>
          <Link to={`/todos/edit/${todo.id}`}>
            <Button size='small'>
              Update
            </Button>
          </Link>
          &nbsp;
          <Button size='small' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </List.Item>
  )
}
