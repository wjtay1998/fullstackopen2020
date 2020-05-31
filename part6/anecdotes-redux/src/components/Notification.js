import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotifMsg } from '../reducers/notifcationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('notif', notification.message)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification.message){
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }
  return null
  
}

export default Notification