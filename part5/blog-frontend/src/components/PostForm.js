import React, { useState } from 'react'

const PostForm = ({ handleCreateNewPost }) => {
  const [newPostAuthor, setNewPostAuthor] = useState('')
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostUrl, setNewPostUrl] = useState('')
  const [newPostLikes, setNewPostLikes] = useState('')

  const prepareNewPost = (event) => {
    event.preventDefault()
    console.log('creating new post', newPostAuthor, newPostTitle, newPostUrl, newPostLikes)

    const newPost = {
      author: newPostAuthor,
      title: newPostTitle,
      url: newPostUrl,
      likes: newPostLikes,
    }

    handleCreateNewPost(newPost)

    setNewPostAuthor('')
    setNewPostTitle('')
    setNewPostUrl('')
    setNewPostLikes('')
  }

  return (
    <form onSubmit={prepareNewPost}>
      <h2>create new</h2>
      <div>
        Author
        <input
          type="text"
          value={newPostAuthor}
          name="Author"
          onChange={({ target }) => setNewPostAuthor(target.value)}
        />
      </div>
      <div>
        Title
        <input
          type="text"
          value={newPostTitle}
          name="Title"
          onChange={({ target }) => setNewPostTitle(target.value)}
        />
      </div>
      <div>
        Url
        <input
          type="text"
          value={newPostUrl}
          name="Url"
          onChange={({ target }) => setNewPostUrl(target.value)}
        />
      </div>
      <div>
        Likes
        <input
          type="number"
          value={newPostLikes}
          name="Likes"
          onChange={({ target }) => setNewPostLikes(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default PostForm