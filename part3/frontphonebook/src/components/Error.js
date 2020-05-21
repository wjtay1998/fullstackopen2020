import React from 'react';

const Error = ({ errorMsg, setErrorMsg }) => {
  const notifStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  }
  
  if( errorMsg === ''){
    return (<div></div>)
  }else{
    {setTimeout(() => {setErrorMsg('')}, 3000)}
    return (
      <div style={notifStyle}>
        {errorMsg}
      </div>
    );
  }
  
};

export default Error;