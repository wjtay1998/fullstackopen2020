import React from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { likePost, deletePost } from '../reducers/blogReducer'
import { genToggleId } from '../reducers/toggleReducer'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()

  const processLike = (event) => {
    event.preventDefault()
    dispatch(likePost(blog))
  }

  const processDelete = (event) => {
    event.preventDefault()
    dispatch(deletePost(blog))
  }

  return (
    <div style={blogStyle} className='postHeader'>
      {blog.title} {blog.author}
      <Togglable id = {genToggleId()} buttonLabel='view'>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button id='like-button' onClick={processLike}>like</button> </p>
        <p>posted by: {blog.user.username}</p>
        <button id ='delete-button' onClick={processDelete}>remove</button>
        <br />
      </Togglable>
    </div>
  )

}

export default Blog
