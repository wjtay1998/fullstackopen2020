import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotifMsg, clearNotifMsg } from '../reducers/notifcationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(setNotifMsg(`you voted "${anecdotes.find(n => n.id == id).content}"`))
    setTimeout(() => {
      dispatch(clearNotifMsg())
    }, 5000);
    
  }

  return(
    <div>
    {anecdotes
      .filter(
        function (a) {
          return a.content.includes(filter)
        }
      )
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