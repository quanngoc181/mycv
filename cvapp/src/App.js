import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from './Navbar'
import { TodoList } from './features/todo/TodoList'
import { EditTodoForm } from './features/todo/EditTodoForm'
import { Login } from './features/authentication/Login'
import { Footer } from './Footer'
import { Register } from './features/authentication/Register'
import { UserInfo } from './features/information/UserInfo'
import { ListCV } from './features/list-cv/ListCV'
import { CreateCV } from './features/create-cv/CreateCV'
import { ViewCV } from './features/view-cv/ViewCV'
import { ConfirmEmail } from './features/authentication/ConfirmEmail'
import { ChangePassword } from './features/authentication/ChangePassword'
import { ForgotPassword } from './features/authentication/ForgotPassword'
import { ResetPassword } from './features/authentication/ResetPassword'
import { Landing } from './Landing'
import { FindCV } from './features/find-cv/FindCV'
import { SaveCV } from './features/save-cv/SaveCV'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login'>
          <Login></Login>
        </Route>

        <Route exact path='/register'>
          <Register></Register>
        </Route>

        <Route exact path='/confirm-email/:cet'>
          <ConfirmEmail></ConfirmEmail>
        </Route>

        <Route exact path='/change-password'>
          <ChangePassword></ChangePassword>
        </Route>

        <Route exact path='/forgot-password'>
          <ForgotPassword></ForgotPassword>
        </Route>

        <Route exact path='/reset-password/:rpt'>
          <ResetPassword></ResetPassword>
        </Route>

        <Route exact path='/cvwr/:identifier'>
          <ViewCV></ViewCV>
        </Route>

        <Route path='/'>
          <NavBar></NavBar>

          <div style={{ minHeight: 'calc(100vh - 104px)', position: 'relative' }}>
            <Switch>
              <Route path='/todos/edit/:todoId'>
                <EditTodoForm></EditTodoForm>
              </Route>
              <Route path='/todos'>
                <TodoList></TodoList>
              </Route>
              <Route exact path='/my-info'>
                <UserInfo></UserInfo>
              </Route>
              <Route exact path='/list-cv'>
                <ListCV></ListCV>
              </Route>
              <Route exact path='/create-cv'>
                <CreateCV></CreateCV>
              </Route>
              <Route exact path='/find-cv'>
                <FindCV></FindCV>
              </Route>
              <Route exact path='/saved-cv'>
                <SaveCV></SaveCV>
              </Route>
              <Route path='/'>
                <Landing></Landing>
              </Route>
            </Switch>
          </div>

          <Footer></Footer>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
