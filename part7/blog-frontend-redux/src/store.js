import { createStore, combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import toggleReducer from './reducers/toggleReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blog: blogReducer,
  notification: notificationReducer,
  toggle: toggleReducer,
  login: loginReducer,
  allUser: userReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))