import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from './Navbar'
import { TodoList } from './features/todo/TodoList'
import { EditTodoForm } from './features/todo/EditTodoForm'

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route path='/todos/edit/:todoId'>
          <EditTodoForm></EditTodoForm>
        </Route>
        <Route path='/todos'>
          <TodoList></TodoList>
        </Route>
        <Route path='/'></Route>
      </Switch>
    </Router>
  )
}

export default App
