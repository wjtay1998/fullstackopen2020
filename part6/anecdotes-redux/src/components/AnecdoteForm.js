import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotifMsg, clearNotifMsg } from '../reducers/notifcationReducer'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    dispatch(setNotifMsg(`you created "${content}"`))
    setTimeout(() => {
      dispatch(clearNotifMsg())
    }, 5000);
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm