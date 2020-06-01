import React, { useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
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
      <Notification />
      <br />
      <Filter />
      <br />
      <AnecdoteList />
      <br />
      <AnecdoteForm />
      <br />
    </div>
  )
}

export default App