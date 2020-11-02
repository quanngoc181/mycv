import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addReaction } from './postSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export function ReactionButton({ post }) {
  const dispatch = useDispatch()

  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
          <Button
            key={name}
            variant='outline-info'
            size='sm'
            onClick={() => {
              dispatch(addReaction({ postId: post.id, reaction: name }))
            }}
          >
            {emoji} {post.reactions[name]}
          </Button>
        )
      })}
    </div>
  )
}
