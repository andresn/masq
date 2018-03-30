import React from 'react'

import LoadingDots from 'components/LoadingDots/LoadingDots'
import Avatar from 'components/Avatar/Avatar'
import Separator from 'components/Separator'

import './Loading.css'

export default function LoadingPage (props) {
  return (
    <div className='LoadingPage'>
      <div className='content'>
        <Avatar image={props.user.image} />
        <h1>{props.user.username}</h1>
        <Separator />
        <LoadingDots />
        <p>Connecting ...</p>
      </div>
    </div>
  )
}
