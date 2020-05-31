import React from 'react'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notifcationReducer'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = () => createStore(reducer, composeWithDevTools())

export default store