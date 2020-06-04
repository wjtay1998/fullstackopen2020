const notifStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 5,
  marginBottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 5,
  marginBottom: 10
}

const notificationReducer = (state = null, action) => {
  switch (action.type){
    case 'SETNOTIF':
      const notif = {
        message: action.message,
        style: notifStyle
      }
      return notif
    case 'SETERROR':
      const error = {
        message: action.message,
        style: errorStyle
      }
      return error
    case 'CLEAR':
      return null
    default:
      return state
  }
}

let timeoutId

export const setNotif = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SETNOTIF',
      message
    })

    if(timeoutId){
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time*1000);
  }
}

export const setError = (message) => {
  const time = 10
  return async dispatch => {
    dispatch({
      type: 'SETERROR',
      message
    })

    if(timeoutId){
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time*1000);
  }
}

export default notificationReducer