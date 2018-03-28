import React from 'react'
import PropTypes from 'prop-types'

import Infos from 'icons/Infos'
import Close from 'icons/Close'

import './Notification.css'

export default function Notification (props) {
  return (
    <div className='Notification'>
      <div id='left-notif'>
        <Infos id='infos-icon' />
        <p>{props.text}</p>
      </div>
      <Close id='close-icon' onClick={props.onClose} />
    </div>
  )
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func
}
