import React from 'react'
import { createPost } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const PostForm = () => {
  const dispatch = useDispatch()

  const handleNewPost = (event) => {
    event.preventDefault()

    const newPost = {
      author: event.target.author.value,
      title: event.target.title.value,
      url: event.target.url.value,
      likes: event.target.likes.value,
    }
    console.log('posting', newPost)
    dispatch(createPost(newPost))
  }

  return (
    <Form onSubmit={handleNewPost}>
      <h2>create new</h2>
      <div>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
        />
      </div>
      <div>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
        />
      </div>
      <div>
        <Form.Label>Url</Form.Label>
        <Form.Control
          type="text"
          name="url"
        />
      </div>
      <div>
        <Form.Label>Likes</Form.Label>
        <Form.Control
          type="number"
          name="likes"
        />
      </div>
      <Button type="submit">create</Button>
    </Form>
  )
}

export default PostForm