import { createStore, combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import toggleReducer from './reducers/toggleReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  blog: blogReducer,
  notification: notificationReducer,
  toggle: toggleReducer,
  login: loginReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))