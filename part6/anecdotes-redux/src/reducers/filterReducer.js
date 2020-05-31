const initialState = ''

export const setFilter = (filter) => {
  return{
    type: 'SET_FILTER',
    data: filter
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    case 'CLEAR_FILTER':
      return ''
    default:
      return state
  }
}

export default notificationReducer