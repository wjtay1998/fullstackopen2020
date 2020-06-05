let toggleid = 1

export const genToggleId = () => {
  return toggleid++
}

const toggleReducer = (state = [], action) => {
  switch (action.type) {
  case 'TOGGLE_VISIBILITY':
    if(state.find(s => s === action.id)){
      const clean = state.filter(s => !(s === action.id))
      return clean
    }else{
      return [...state, action.id]
    }
  default: 
    return state
  }
}

export const toggleVisibility = (id) => (
  {
    type: 'TOGGLE_VISIBILITY',
    id,
  }
)

export default toggleReducer