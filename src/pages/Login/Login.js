import React from 'react'

import PlusButton from 'icons/Plusbutton'

import './Login.css'

export default function Login () {
  return (
    <div className='Login'>
      <h1>Who is it ?</h1>

      <div className='avatars-grid'>
        <div>
          <div className='avatar' />
          <p>Clarisse</p>
        </div>
        <div>
          <div className='avatar' />
          <p>Clarisse</p>
        </div>
        <div>
          <div className='avatar' />
          <p>Clarisse</p>
        </div>
        <div>
          <div className='avatar' />
          <p>Clarisse</p>
        </div>
        <div>
          <div className='avatar' />
          <p>Clarisse</p>
        </div>

        <div>
          <PlusButton />
          <p>Add user</p>
        </div>
      </div>
    </div>
  )
}
