const initialState = {message: null}
export const clearNotifMsg = () => {
  return {
    type: 'CLEAR_MESSAGE',
  }
}

export const setNotifMsg = (msg) => {
  return {
    type: 'SET_MESSAGE',
    data: msg
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {message: action.data}
    case 'CLEAR_MESSAGE':
      return {message: null}
    default:
      return state
  }
}

export default notificationReducer