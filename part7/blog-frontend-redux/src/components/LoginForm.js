import React from 'react'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

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

      <Form onSubmit={handleLogin}>
        <div>
          <Form.Label>Username</Form.Label>
          <Form.Control 
            id='username'
            type="text"
            name="username" />
        </div>
        <div>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id='password'
            type="password"
            name="password"
          />
        </div>
        <Button id='login-button' type="submit">login</Button>
      </Form>

    </div>
  )
}

export default LoginForm