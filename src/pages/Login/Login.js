import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import PlusButton from 'icons/Plusbutton'

import './Login.css'

export default function Login (props) {
  return (
    <div className='Login'>
      <h1>Who is it ?</h1>

      <div className='avatars-grid'>
        <Link to='devices' onClick={props.auth}>
          <div className='avatar' />
          <p>Clarisse</p>
        </Link>
        <Link to='devices' onClick={props.auth}>
          <div className='avatar' />
          <p>Clarisse</p>
        </Link>
        <Link to='devices' onClick={props.auth}>
          <div className='avatar' />
          <p>Clarisse</p>
        </Link>

        <Link to='register'>
          <PlusButton />
          <p>Add user</p>
        </Link>
      </div>
    </div>
  )
}

Login.propTypes = {
  auth: PropTypes.func.isRequired
}
