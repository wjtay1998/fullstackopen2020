import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(
  mapStateToProps, null
)(Notification)

export default ConnectedNotification