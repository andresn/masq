import React from 'react'

import { LoadingDots } from 'components'
import { Background, Logo } from 'icons'

import './Loading.css'

const styles = {
  background: {
    bottom: 0,
    position: 'absolute'
  },
  logo: {
    paddingBottom: 64
  }
}

export default function Loading () {
  return (
    <div className='LoadingPage'>
      <Logo style={styles.logo} />
      <LoadingDots />
      <p>Loading</p>
      <Background style={styles.background} />
    </div>
  )
}
