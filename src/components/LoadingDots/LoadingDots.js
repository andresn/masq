import React from 'react'

import './LoadingDots.css'

const colors = ['#4ebbc2', '#3394d2', '#e53b5b']

export default function LoadingDots () {
  return (
    <div className='Loading'>
      <div style={{backgroundColor: colors[0]}} className='loading-dots' />
      <div style={{backgroundColor: colors[1]}} className='loading-dots' />
      <div style={{backgroundColor: colors[2]}} className='loading-dots' />
    </div>
  )
}
