import React from 'react'

const Error = ({ errorMessage }) => {
  const notifStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  }

  if (errorMessage) {
    return (
      <div style={notifStyle}>
        {errorMessage}
      </div>
    )
  }

  return null

}

export default Error