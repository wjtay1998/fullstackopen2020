import React from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

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