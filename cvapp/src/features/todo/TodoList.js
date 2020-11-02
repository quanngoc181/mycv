import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AddTodoForm } from './AddTodoForm'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const todoList = useSelector((state) => state.todo.items)

  return (
    <Container>
      <ListGroup className='mt-5'>
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>

      <div className='my-5'>
        <AddTodoForm className='mt-5' />
      </div>
    </Container>
  )
}
