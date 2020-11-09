import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from './Navbar'
import { TodoList } from './features/todo/TodoList'
import { EditTodoForm } from './features/todo/EditTodoForm'
import { Login } from './features/authen/Login'
import { Footer } from './Footer'

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
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='/'></Route>
      </Switch>

      <Footer></Footer>
    </Router>
  )
}

export default App
