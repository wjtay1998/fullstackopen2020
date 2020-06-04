import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisibility } from '../reducers/toggleReducer'

const Togglable = ({id, children, buttonLabel}) => {
  const dispatch = useDispatch()
  const visiblities = useSelector(state => state.toggle)
  let visible = null
  if(visiblities){
    visible = visiblities.find(v => v === id)
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleToggle = () => {
    dispatch(toggleVisibility(id))
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleToggle}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <button onClick={handleToggle}
          >cancel
        </button>
      </div>
    </div>
  )
}


export default Togglable