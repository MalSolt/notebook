import React from 'react'
import './Alert.scss'

export const Alert = ({ alertContent, setShowAlert }) => {
  return (
    <div className={`alert alert-${alertContent.type} alert-dismissible`}>
      <strong>Attention!</strong> {alertContent.title}
      <button className='close' onClick={() => setShowAlert(false)}>
        &times;
      </button>
    </div>
  )
}
