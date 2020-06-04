import React from 'react'
import { createPost } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

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
    <form onSubmit={handleNewPost}>
      <h2>create new</h2>
      <div>
        Author
        <input
          type="text"
          name="author"
        />
      </div>
      <div>
        Title
        <input
          type="text"
          name="title"
        />
      </div>
      <div>
        Url
        <input
          type="text"
          name="url"
        />
      </div>
      <div>
        Likes
        <input
          type="number"
          name="likes"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default PostForm