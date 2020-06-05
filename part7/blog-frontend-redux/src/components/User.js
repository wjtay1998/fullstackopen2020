import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if(!user){
    return null
  }
  
  const userBlogs = user.posts
  
  return (
    <div>
      <div>
        <ListGroup>
          {userBlogs.map(blog =>
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
      
    </div>
  )
}

export default User