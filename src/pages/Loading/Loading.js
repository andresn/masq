import React from 'react'

import { LoadingDots, Avatar, Separator } from 'components'
import { UserContext } from 'context/user'

import './Loading.css'

export default function LoadingPage () {
  return (
    <UserContext.Consumer>
      {user =>
        <div className='LoadingPage'>
          <div className='content'>
            <Avatar image={user.image} />
            <h1>{user.username}</h1>
            <Separator />
            <LoadingDots />
            <p>Connecting ...</p>
          </div>
        </div>
      }
    </UserContext.Consumer>
  )
}
