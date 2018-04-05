import React from 'react'
import PropTypes from 'prop-types'

import { Infos, Close } from 'icons'

import './Notification.css'

export default function Notification (props) {
  const { onClose, text } = props
  return (
    <div className='Notification'>
      <div id='left-notif'>
        <Infos id='infos-icon' />
        <p>{text}</p>
      </div>
      <Close id='close-icon' onClick={onClose} />
    </div>
  )
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func
}
