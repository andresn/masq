import React from 'react'
import PropTypes from 'prop-types'

import { Close } from 'icons'

import './Modal.css'

export default function Modal (props) {
  const modalStyle = {
    height: props.height,
    width: props.width
  }

  return (
    <div className='Modal'>
      <div className='overlay' onClick={props.onClose} />
      <div className='modal' style={modalStyle}>
        <Close className='close' width={9} height={9} onClick={props.onClose} />
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func
}
