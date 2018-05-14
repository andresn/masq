import React from 'react'

import { LoadingDots, Avatar } from 'components'
import { Background, Logo } from 'icons'

import './Loading.css'

const styles = {
  background: {
    bottom: 0,
    maxHeight: 252,
    position: 'absolute'
  },
  logo: {
    paddingBottom: 64
  }
}

export default function Loading (props) {
  const { user } = props

  return (
    <div className='LoadingPage'>
      <Logo style={styles.logo} />
      {user &&
        <div className='user'>
          <Avatar user={user} image={user.image} />
          <p className='username'>{user.username}</p>
        </div>
      }
      <LoadingDots />
      <p>Loading</p>
      <Background style={styles.background} />
    </div>
  )
}
