import React from 'react'

import { LoadingDots, Avatar, Separator } from 'components'

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
