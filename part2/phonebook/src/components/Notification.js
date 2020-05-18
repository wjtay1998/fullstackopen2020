import React from 'react';

const Notification = ({ notificationMsg, setNotificationMsg }) => {
  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  }
  
  if( notificationMsg === ''){
    return (<div></div>)
  }else{
    {setTimeout(() => {setNotificationMsg('')}, 3000)}
    return (
      <div style={notifStyle}>
        {notificationMsg}
      </div>
    );
  }
  
};

export default Notification;