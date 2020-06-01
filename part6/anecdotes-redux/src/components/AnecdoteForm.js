import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notifcationReducer'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdote(content)
    props.setNotification(`you created "${content}"`, 5)
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

const mapDispatchToProps = dispatch => {
  return {
    setNotification: value => {dispatch(setNotification(value))},
    newAnecdote: value => {dispatch(newAnecdote(value))},
  }
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm