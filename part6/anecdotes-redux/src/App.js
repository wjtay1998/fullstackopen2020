import React, { useEffect } from 'react'
import ConnectedFilter from './components/Filter'
import ConnectedNotification from './components/Notification'
import ConnectedAnecdoteList from './components/AnecdoteList'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <h1>Anecdotes</h1>
      <ConnectedNotification />
      <br />
      <ConnectedFilter />
      <br />
      <ConnectedAnecdoteList />
      <br />
      <ConnectedAnecdoteForm />
      <br />
    </div>
  )
}

export default App