import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_ALLUSERS':
    return action.data
  default:
    return state
  }
}

export const initializeAllUsers = () => {
  return async dispatch => {
    const data = await userService.getAllUsers()
    dispatch({
      type: 'INIT_ALLUSERS',
      data
    })
  }
}

export default userReducer