import React from 'react'
import { ReactComponent as Logo } from './logo.svg'
import './App.css'
import Clock from './Clock'

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Logo className='App-logo' />
        <p>Hello World</p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          React Document
        </a>
        <Clock />
      </header>
    </div>
  )
}

export default App
