import React from 'react'

import Infos from 'icons/Infos'
import Close from 'icons/Close'

import './Notification.css'

export default function Notification (props) {
  return (
    <div className='Notification'>
      <div className='leftNotif'>
        <Infos className='infos-icon' />
        <p>{props.text}</p>
      </div>
      <Close className='close-icon' />
    </div>
  )
}
