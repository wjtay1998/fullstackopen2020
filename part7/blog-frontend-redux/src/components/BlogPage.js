import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import PostForm from './PostForm'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

import { genToggleId } from '../reducers/toggleReducer'
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom'

const BlogPage = () => {
  const blogs = useSelector(state => state.blog)
  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(u => u.id === blogMatch.params.id)
    : null

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogList = () => {
    if (!blog) {
      return (
        <div>
          <h2>Blog Posts</h2>
          <ListGroup>
            {blogs.sort(byLikes).map(blog =>
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      )
    }
    return null
  }
  return (
    <div>
      <div>
        <Togglable id={genToggleId()} buttonLabel='new post' >
          <PostForm />
        </Togglable>
        <br />
        {blogList()}
      </div>

      <Switch>
        <Route path='/blogs/:id'>
          <Blog blog={blog} />
        </Route>
      </Switch>
    </div>
  )

}

export default BlogPage
