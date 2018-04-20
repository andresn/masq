import React from 'react'

import { Background, Logo } from 'icons'

const styles = {
  Splash: {
    backgroundColor: 'var(--blue-500)',
    width: '100%',
    height: '100%',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    bottom: 0,
    position: 'absolute'
  }
}

export default function Splash () {
  return (
    <div style={styles.Splash}>
      <Logo width={386} height={152} />
      <Background style={styles.background} />
    </div>
  )
}
