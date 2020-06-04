import React from 'react'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  
  const handleLogin = (event) => {
    event.preventDefault()

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    dispatch(loginUser(credentials))
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            name="password"
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>

    </div>
  )
}

export default LoginForm