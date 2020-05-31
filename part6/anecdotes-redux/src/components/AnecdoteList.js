import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    })
  }

  return(
    <div>
    {anecdotes
      .sort(function(a, b) {
        if(a.votes > b.votes){
          return 1
        }
        if(a.votes < b.votes){
          return -1
        }
        return 0
      })      
      .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList