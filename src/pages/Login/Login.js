import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Plusbutton } from 'icons'
import { Avatar } from 'components'

import './Login.css'

export default function Login (props) {
  const { users, auth } = props
  const style = !users.length ? { display: 'flex' } : {}
  return (
    <div className='Login'>
      <h1>Who is it ?</h1>

      <div className='avatars-grid' style={style}>
        {users.map((user, index) =>
          <Link style={{textDecoration: 'none'}} key={index} to='devices' onClick={() => auth(index)}>
            <Avatar image={user.image} />
            <p>{user.username}</p>
          </Link>
        )}

        <Link to='register' style={{textDecoration: 'none'}}>
          <div style={{height: '120px'}}>
            <Plusbutton />
          </div>
          <p id='add-user'>Add user</p>
        </Link>
      </div>
    </div>
  )
}

Login.propTypes = {
  auth: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}
