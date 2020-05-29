import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const processLike = (event) => {
    event.preventDefault()
    handleLike(blog)
  }

  const processDelete = (event) => {
    event.preventDefault()
    handleDelete(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel='view'>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={processLike}>like</button> </p>
        <p>posted by: {blog.user.username}</p>
        <button onClick={processDelete}>remove</button>
        <br />
      </Togglable>
    </div>
  )

}

export default Blog
