import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function NavBar() {
  return (
    <>
      <Navbar bg='primary' variant='dark'>
        <Navbar.Brand>
          <div className='app-logo' style={{ fontSize: 30 }}>
            MYCV
          </div>
        </Navbar.Brand>
        <Nav className='mr-auto'>
          <Link to='/todos'>
            <Nav.Link as='span'>Todo</Nav.Link>
          </Link>
        </Nav>
        <Nav>
          <Link to='/login'>
            <Nav.Link as='span'>Login</Nav.Link>
          </Link>
          <Link to='/register'>
            <Nav.Link as='span'>Register</Nav.Link>
          </Link>
        </Nav>
      </Navbar>
    </>
  )
}
