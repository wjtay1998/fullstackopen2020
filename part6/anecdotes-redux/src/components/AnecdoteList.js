import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifcationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdote
  const filter = props.filter

  const vote = (id) => {
    console.log('vote', id)
    props.addVote(id)
    props.setNotification(`you voted "${anecdotes.find(n => n.id === id).content}"`,5)
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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList