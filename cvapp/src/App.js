import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from './Navbar'
import { TodoList } from './features/todo/TodoList'
import { EditTodoForm } from './features/todo/EditTodoForm'
import { Login } from './features/authen/Login'
import { Footer } from './Footer'
import { Register } from './features/authen/Register'
import { UserInfo } from './features/information/UserInfo'
import { ListCV } from './features/list-cv/ListCV'
import { CreateCV } from './features/create-cv/CreateCV'

function App() {
  return (
    <Router>
      <div style={{ minHeight: 'calc(100vh - 50px)', position: 'relative' }}>
        <Switch>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/register'>
            <Register></Register>
          </Route>
          <Route path='/'>
            <NavBar></NavBar>

            <Switch>
              <Route path='/todos/edit/:todoId'>
                <EditTodoForm></EditTodoForm>
              </Route>
              <Route path='/todos'>
                <TodoList></TodoList>
              </Route>
              <Route path='/my-info'>
                <UserInfo></UserInfo>
              </Route>
              <Route path='/list-cv'>
                <ListCV></ListCV>
              </Route>
              <Route path='/create-cv'>
                <CreateCV></CreateCV>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </div>
      <Footer></Footer>
    </Router>
  )
}

export default App
