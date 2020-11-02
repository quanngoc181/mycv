import { faCheckSquare, faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTodo, toggleStatus } from './todoSlice'

export function TodoItem({ todo }) {
  const dispatch = useDispatch()

  const handleToggleStatus = () => {
    dispatch(toggleStatus({ id: todo.id }))
  }

  const handleDelete = () => {
    dispatch(deleteTodo({ id: todo.id }))
  }

  return (
    <ListGroup.Item>
      <div className='d-flex justify-content-between align-items-center' style={{ opacity: todo.done ? 0.5 : 1 }}>
        <div className='content'>
          <FontAwesomeIcon icon={todo.done ? faCheckSquare : faWindowClose} onClick={handleToggleStatus} />
          <span> - </span>
          <b>{todo.title}</b>
          <span> - </span>
          <span>{todo.content}</span>
        </div>
        <div className='action'>
          <Link to={`/todos/edit/${todo.id}`}>
            <Button variant='outline-primary' size='sm'>
              Update
            </Button>
          </Link>
          &nbsp;
          <Button variant='outline-primary' size='sm' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  )
}
