import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
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
        <Button onClick={handleToggle}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <Button onClick={handleToggle}
        >cancel
        </Button>
      </div>
    </div>
  )
}


export default Togglable