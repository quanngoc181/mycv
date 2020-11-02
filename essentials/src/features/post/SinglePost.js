import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, ListGroup } from 'react-bootstrap'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButton } from './ReactionButton'
import { selectPostById } from './postSlice'

export function SinglePost() {
  const { postId } = useParams()

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) return <p>Post Not Found</p>

  return (
    <ListGroup>
      <ListGroup.Item>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <p>{post.content}</p>
        <ReactionButton post={post} />
        <Link to={`/editPost/${post.id}`}>
          <Button variant='outline-info'>Edit</Button>
        </Link>
      </ListGroup.Item>
    </ListGroup>
  )
}
