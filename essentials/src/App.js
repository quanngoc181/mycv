import React from 'react'
import { Container } from 'react-bootstrap'
import { AddPostForm } from './features/post/AddPostForm'
import { EditPostForm } from './features/post/EditPostForm'
import { PostList } from './features/post/PostList'
import { SinglePost } from './features/post/SinglePost'
import { NavBar } from './NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { UserList } from './features/user/UserList'
import { UserPage } from './features/user/UserPage'
import { NotificationList } from './features/notification/NotificationList'

function App() {
  return (
    <Router>
      <NavBar />

      <Container>
        <Switch>
          <Route path='/post/:postId'>
            <SinglePost></SinglePost>
          </Route>
          <Route path='/editPost/:postId'>
            <EditPostForm></EditPostForm>
          </Route>
          <Route path="/user/:userId">
            <UserPage></UserPage>
          </Route>
          <Route path="/user">
            <UserList></UserList>
          </Route>
          <Route path="/notification">
            <NotificationList></NotificationList>
          </Route>
          <Route path='/'>
            <AddPostForm></AddPostForm>
            <PostList></PostList>
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App
