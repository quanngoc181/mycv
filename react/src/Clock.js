import React, { useState, useEffect } from 'react'

const Clock = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    document.title = date.toLocaleTimeString()
  })
  let timeInterval = setInterval(() => {
    setDate(new Date())
  }, 1000)
  useEffect(() => {
    return () => {
      clearInterval(timeInterval)
    }
  })

  const clickHandler = (string) => {
    console.log(string)
  }

  return (
    <div onClick={() => clickHandler('clicked')}>
      <h2>It is {date.toLocaleTimeString()}</h2>
    </div>
  )
}

export default Clock
