import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function NavBar() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>TODO App</h1>

      <Navbar bg='primary' variant='dark'>
        <Link to='/'>
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>
        <Link to='/todos'>
          <Navbar.Brand>Todos</Navbar.Brand>
        </Link>
        <Link to='/login'>
          <Navbar.Brand>LogIn</Navbar.Brand>
        </Link>
      </Navbar>
    </>
  )
}
