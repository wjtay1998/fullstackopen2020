import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifcationMessage, setNotificationMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newPostAuthor, setNewPostAuthor] = useState('')
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostUrl, setNewPostUrl] = useState('')
  const [newPostLikes, setNewPostLikes] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setNotificationMessage('Successsful login')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

    setNotificationMessage('Successsful logout')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  
  const handleCreateNewPost = async (event) => {
    event.preventDefault()
    console.log('creating new post', newPostAuthor, newPostTitle, newPostUrl, newPostLikes)

    const newPost = {
      author: newPostAuthor,
      title: newPostTitle,
      url: newPostUrl,
      likes: newPostLikes,
    }

    try{
      const savedPost = await blogService.create(newPost)
      setBlogs(blogs.concat(savedPost))
      
      setNewPostAuthor('')
      setNewPostTitle('')
      setNewPostUrl('')
      setNewPostLikes('')

      setNotificationMessage(`${user.username} successfully created a new blog ${savedPost.title}!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    }catch (exception) {
      setErrorMessage('Post creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const postForm = () => (
    <form onSubmit={handleCreateNewPost}>
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

  return (
    <div>
      <h1>Blogs</h1>

      <Notification notificationMessage = {notifcationMessage} />
      <Error errorMessage = {errorMessage} />

      {user === null ? 
        loginForm() :
        <div>
          <p> {user.username} logged in <button onClick = {handleLogout}> logout </button></p>
          {postForm()}

          <br />
          <h2>Blog Posts</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        
        </div>
      }

    </div>
  )
}

export default App