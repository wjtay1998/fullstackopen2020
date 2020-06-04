import React, { useEffect } from 'react'

import BlogPage from './components/BlogPage'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import { initializePosts } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'

import { useSelector, useDispatch } from 'react-redux'
import { genToggleId } from './reducers/toggleReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {user === null ?
        <Togglable id = {genToggleId()} buttonLabel='login'>
          <LoginForm />
        </Togglable>
        :
        <BlogPage />
      }

    </div>
  )
}

export default App