const initialState = {message: null}
export const clearNotifMsg = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }
}

export const setNotifMsg = (msg) => {
  return async dispatch => {
    console.log('settingnotif', msg)
    dispatch({
      type: 'SET_MESSAGE',
      data: msg
    })
  }
}

let timeoutId
export const setNotification = (msg, time) => {
  return async dispatch => {
    console.log('notified', msg)
    dispatch({
      type: 'SET_MESSAGE',
      data: msg
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, time*1000)
    
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