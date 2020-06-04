import React, { useEffect } from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import PostForm from './PostForm'
import { useDispatch, useSelector } from 'react-redux'

import { logoutUser } from '../reducers/loginReducer'
import { genToggleId } from '../reducers/toggleReducer'
import { initializeAllPosts } from '../reducers/blogReducer'

const BlogPage = () => {
  let id = 0
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeAllPosts())
  }, [])

  const handleLogout = (event) =>{
    event.preventDefault()
    dispatch(logoutUser())
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return(
    <div>
      <p> {user.username} logged in <button id='logout-button' onClick={handleLogout}> logout </button></p>
      <Togglable id = {genToggleId()} buttonLabel='new post' >
        <PostForm />
      </Togglable>
      <br />
      <h2>Blog Posts</h2>
      {blogs.sort(byLikes).map(blog =>
        <Blog key = {blog.id} blog = {blog}/>
      )}

    </div>
  )

}

export default BlogPage
