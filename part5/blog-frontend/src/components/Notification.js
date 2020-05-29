import React from 'react';

const Notification = ({ notificationMessage }) => {
  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  }
  
  if(notificationMessage){
    return (
      <div style={notifStyle}>
        {notificationMessage}
      </div>
    );
  }

  return null
  
};

export default Notification;