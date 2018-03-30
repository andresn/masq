import React from 'react'

import Loading from 'components/Loading/Loading'
import Avatar from 'components/Avatar/Avatar'
import Separator from 'components/Separator'

import './LoadingPage.css'

export default function LoadingPage (props) {
  return (
    <div className='LoadingPage'>
      <div className='content'>
        <Avatar image={props.user.image} />
        <h1>{props.user.username}</h1>
        <Separator />
        <Loading />
        <p>Connecting ...</p>
      </div>
    </div>
  )
}
