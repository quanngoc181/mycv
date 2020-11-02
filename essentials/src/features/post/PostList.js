import React, { useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButton } from './ReactionButton'
import { selectAllPost, fetchPosts } from './postSlice'

export function PostList() {
  const posts = useSelector((state) => selectAllPost(state))
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const dispatch = useDispatch()
  const postStatus = useSelector((state) => state.post.status)
  const postError = useSelector((state) => state.post.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <div>Loading...</div>
  } else if (postStatus === 'succeeded') {
    content = (
      <ListGroup>
        {orderedPosts.map((post) => (
          <ListGroup.Item key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
            <p>{post.content}</p>
            <ReactionButton post={post} />
            <Link to={'/post/' + post.id}>
              <Button variant='outline-info'>View</Button>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  } else if(postStatus === 'failed') {
    content = <div>{postError}</div>
  }

  return (
    <>
      <h2>Posts</h2>
      {content}
    </>
  )
}
