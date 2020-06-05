import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import User from './User'

import { initializeAllUsers } from '../reducers/userReducer'


const UserPage = () => {
  const dispatch = useDispatch()
  const allUser = useSelector(state => state.allUser)
  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? allUser.find(u => u.id === userMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeAllUsers())
  }, [dispatch])

  const userList = () => {
    if (!user) {
      return (
        <div>
          <h1>Users</h1>
          <br />
          <Table>
            <thead>
              <tr>
                <td>name</td>
                <td>blogs created</td>
              </tr>
            </thead>
            <tbody>
              {allUser.map(user =>
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                  <td>{user.posts.length}</td>
                </tr>)}
            </tbody></Table>
        </div>
      )
    }
    return null
  }
  return (
    <div>
      {userList()}

      <Switch>
        <Route path='/users/:id'>
          <User user={user} />
        </Route>
      </Switch>
    </div>
  )

}

export default UserPage