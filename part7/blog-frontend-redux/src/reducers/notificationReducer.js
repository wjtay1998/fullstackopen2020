const notificationReducer = (state = null, action) => {
  switch (action.type){
  case 'SETNOTIF':
    return action.data
  case 'SETERROR':
    return action.data
  case 'CLEAR':
    return null
  default:
    return state
  }
}

let timeoutId

export const setNotif = (message) => {
  const time = 5
  return async dispatch => {
    const data = {
      message,
      variant: 'success'
    }
    dispatch({
      type: 'SETNOTIF',
      data
    })

    if(timeoutId){
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time*1000)
  }
}

export const setError = (message) => {
  const time = 5
  return async dispatch => {
    const data = {
      message,
      variant: 'danger'
    }
    dispatch({
      type: 'SETERROR',
      data
    })

    if(timeoutId){
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time*1000)
  }
}

export default notificationReducer