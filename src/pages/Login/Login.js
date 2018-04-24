import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Avatar } from 'components'
import { Background, Logo, Plusbutton } from 'icons'

import './Login.css'

const styles = {
  background: {
    bottom: 0,
    position: 'absolute'
  },
  logo: {
    paddingBottom: 64
  }
}

export default function Login (props) {
  const { users, onAuth } = props
  // const style = !users.length ? { display: 'flex' } : {}
  return (
    <div className='Login'>
      <div className='header'>
        <Logo style={styles.logo} />
        <h1>Who is it ?</h1>
      </div>

      <div className='users'>
        {users.map((user, index) =>
          <Link style={{textDecoration: 'none'}} key={index} to='devices' onClick={() => onAuth(index)}>
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
      <Background style={styles.background} />
    </div>
  )
}

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}
