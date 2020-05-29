import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import PostForm from './components/PostForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifcationMessage, setNotificationMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [notifcationMessage, user])

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

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  const handleCreateNewPost = async (newPost) => {

    try {
      const savedPost = await blogService.create(newPost)
      noteFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(savedPost))

      setNotificationMessage(`${user.username} successfully created a new blog ${savedPost.title}!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Post creation failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLike = async (post) => {
    post.likes += 1
    try {
      await blogService.update(post)

      setNotificationMessage(`${user.username} successfully liked a post ${post.title}!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Like failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (post) => {
    if (window.confirm(`Remove ${post.title} by ${post.author}`)) {
      try {
        await blogService.remove(post)

        setNotificationMessage(`${user.username} successfully deleted a post ${post.title}!`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

      } catch (exception) {
        setErrorMessage('Deletion failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification notificationMessage={notifcationMessage} />
      <Error errorMessage={errorMessage} />

      {user === null ?
        <Togglable buttonLabel='login'>
          {loginForm()}
        </Togglable>
        :
        <div>
          <p> {user.username} logged in <button onClick={handleLogout}> logout </button></p>
          <Togglable buttonLabel='new post' ref={noteFormRef}>
            <PostForm handleCreateNewPost={handleCreateNewPost} />
          </Togglable>
          <br />
          <h2>Blog Posts</h2>
          {blogs.sort((a, b) => (a.likes > b.likes) ? 1 : -1).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
          )}

        </div>
      }

    </div>
  )
}

export default App