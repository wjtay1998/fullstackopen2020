import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link, useHistory } from 'react-router-dom'
import { Button, Navbar } from 'react-bootstrap'

import BlogPage from './components/BlogPage'
import UserPage from './components/UserPage'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import { logoutUser } from './reducers/loginReducer'
import { initializeAllPosts } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { genToggleId } from './reducers/toggleReducer'

const style = {
  padding: 5,
  fontSize: 20,
}

const App = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  console.log('user',user)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeAllPosts())
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    history.push('/')
  }

  const Header = () => {
    return(
      <div>
        <Navbar expand='lg' bg='dark' variant='dark'>
          <Link style={style} to='/blogs'>blogs</Link>
          <Link style={style} to='/users'>users</Link>
        </Navbar>
        <br />
        <h5>{user.username} logged in <Button id='logout-button' onClick={handleLogout}> logout </Button></h5>
        
        <Switch>
          <Route path = '/blogs'>
            <BlogPage />
          </Route>
          <Route path = '/users'>
            <UserPage />
          </Route>
        </Switch>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {user === null ?
        <Togglable id = {genToggleId()} buttonLabel='login'>
          <LoginForm />
        </Togglable>
        :
        Header()
      }

    </div>
  )
}

export default App