import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotif, setError } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const data = await loginService.login(credentials)
      blogService.setToken(data.token)
      dispatch({
        type: 'LOGIN',
        data
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(data)
      )
      dispatch(setNotif(`${data.username} successfully logged in`))
    } catch (exception) {
      dispatch(setError(`Failed to log in`))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    try{
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      dispatch({
        type: 'LOGOUT'
      })
      dispatch(setNotif(`Successfully logged out`))
    } catch (exception){
      dispatch(setError(`Failed to log out`))
    }
    
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON)
      blogService.setToken(data.token)
      dispatch({
        type: 'LOGIN',
        data: data
      })
    }
  }
}

export default loginReducer