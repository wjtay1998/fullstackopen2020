import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('notif', notification.message)

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