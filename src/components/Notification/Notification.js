import React from 'react'
import ReactSVG from 'react-svg'

import './Notification.css'

export default function Notification (props) {
  return (
    <div className='Notification'>
      <div className='leftNotif'>
        <ReactSVG className='infos-icon' path='/assets/Infos.svg' />
        <p>{props.text}</p>
      </div>
      <ReactSVG className='close-icon' path='/assets/Close.svg' />
    </div>
  )
}
