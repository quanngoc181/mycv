import { List } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTodoForm } from './AddTodoForm'
import { TodoItem } from './TodoItem'
import { fetchTodo } from './todoSlice'

export function TodoList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodo())
  }, [dispatch])

  const todoList = useSelector((state) => state.todo.items)

  return (
    <div className='container'>
      <List className='mt-5' bordered dataSource={todoList} renderItem={(todo) => <TodoItem todo={todo} />} />

      <div className='my-5'>
        <AddTodoForm />
      </div>
    </div>
  )
}
