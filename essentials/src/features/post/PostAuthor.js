import React from 'react'
import { useSelector } from 'react-redux'

export function PostAuthor({ userId }) {
  const user = useSelector((state) => state.user.find((user) => user.id === userId))

  return <span>by {user ? user.name : 'Unknown'}</span>
}
