import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function NavBar() {
  const logout = () => {
    localStorage.removeItem('my-cv-token')
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
        <Nav className='mr-auto'>
          <Link to='/todos'>
            <Nav.Link as='span'>Todo</Nav.Link>
          </Link>
        </Nav>
        <Nav>
          <Link to='/login'>
            <Nav.Link as='span'>Đăng nhập</Nav.Link>
          </Link>
          <Link to='/register'>
            <Nav.Link as='span'>Đăng ký</Nav.Link>
          </Link>
          <Nav.Link as='span' style={{ cursor: 'pointer' }} onClick={logout}>
            Đăng xuất
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  )
}
