import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications } from './features/notification/notificationSlice'

export function NavBar() {
  const dispatch = useDispatch()

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  return (
    <>
      <div className='blue'>
        <h1>Redux Essentials Example</h1>
      </div>
      <Navbar bg='primary' variant='dark'>
        <Link to='/'>
          <Navbar.Brand>Posts</Navbar.Brand>
        </Link>
        <Link to='/user'>
          <Navbar.Brand>Users</Navbar.Brand>
        </Link>
        <Link to='/notification'>
          <Navbar.Brand>Notifications</Navbar.Brand>
        </Link>
        <Button onClick={fetchNewNotifications}>Refresh Notifications</Button>
      </Navbar>
    </>
  )
}
