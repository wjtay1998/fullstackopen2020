import React from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likePost, deletePost, commentPost } from '../reducers/blogReducer'
import { genToggleId } from '../reducers/toggleReducer'
import { Form, Button, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  if(!blog){
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const processLike = (event) => {
    event.preventDefault()
    dispatch(likePost(blog))
  }

  const processComment = (event) => {
    event.preventDefault()
    dispatch(commentPost(blog, event.target.comment.value))
    event.target.comment.value=''
  }

  const processDelete = (event) => {
    event.preventDefault()
    dispatch(deletePost(blog))
    history.push('/blogs')
  }

  const listComments = () => {
    console.log('blogcomment', blog)
    if(blog.comment){
      return(
        <ListGroup variant='flush'>
          {blog.comment.map(comment =>
            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>)}
        </ListGroup>
      )
    }
    return null
  }

  return (
    <div style={blogStyle} className='postHeader'>
      <h3>{blog.title}</h3>
      <h5>{blog.author}</h5>
      <Togglable id = {genToggleId()} buttonLabel='view'>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <Button variant="primary" id='like-button' onClick={processLike}>like</Button> </p>
        <p>posted by: {blog.user.username}</p>
        <p><Button variant="primary" id ='delete-button' onClick={processDelete}>remove</Button></p>
      </Togglable>

      <br />
      <h4>Comments</h4>
      <Form onSubmit={processComment}>
        <Form.Control type='text' name='comment'/>
        <Button variant="primary" type='submit'>add comment</Button>
      </Form>

      <br />
      {listComments()}
    </div>
  )

}

export default Blog
