import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from './features/authen/userSlice'
import './navbar.css'
import defaultAvatar from './image/default-avatar.png'

export function NavBar() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  let rightNav, centerNav
  if (user === null) {
    centerNav = <Nav variant='pills' className='mr-auto ml-auto'></Nav>
    rightNav = (
      <Nav>
        <Link to='/login'>
          <Nav.Link as='span'>Đăng nhập</Nav.Link>
        </Link>
        <Link to='/register'>
          <Nav.Link as='span'>Đăng ký</Nav.Link>
        </Link>
      </Nav>
    )
  } else {
    centerNav = (
      <Nav variant='pills' className='mr-auto ml-auto'>
        <Link to='/todos'>
          <Nav.Link as='span'>Todo</Nav.Link>
        </Link>
      </Nav>
    )
    rightNav = (
      <Nav>
        <img src={defaultAvatar} className='nav-avatar' alt='Avatar' />
        <Nav.Link as='span' style={{ cursor: 'pointer' }}>
          {user.lastName}
        </Nav.Link>
        <NavDropdown title='' id='user-dropdown' className='right-dropdown'>
          <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    )
  }

  return (
    <>
      <Navbar bg='primary' variant='dark'>
        <Navbar.Brand>
          <Link to='/'>
            <div className='app-logo' style={{ fontSize: 30 }}>
              MYCV
            </div>
          </Link>
        </Navbar.Brand>
        {centerNav}
        {rightNav}
      </Navbar>
    </>
  )
}
