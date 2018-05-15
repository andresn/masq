import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Avatar } from 'components'
import { Chevron, Home } from 'icons'

import { UserContext } from 'context/user'

import './Header.css'

function TitleSection () {
  return (
    <div id='title-section'>
      <p id='title'>Masq</p>
      <p>&nbsp;by Qwant</p>
    </div>
  )
}

function AvatarSection (props) {
  const { image, user } = props
  return (
    <div id='avatar-section'>
      <Avatar image={image} user={user} />
      <span id='avatar-text' style={{fontSize: '14px'}}>{user.username}</span>
      <Chevron className='caret' />
    </div>
  )
}

export default function Header (props) {
  const { shadow, children, onLogout, childrenHeight } = props
  const height = childrenHeight ? 80 + childrenHeight : 64

  return (
    <UserContext.Consumer>
      {user =>
        <div>
          <div id='invisible' style={{height: height}} />
          <div className={'Header' + (shadow ? ' shadow' : '')}>
            <div id='top-section'>
              {user ? <AvatarSection user={user} image={user.image} /> : <TitleSection /> }
              <Link to='login'>
                <Home className='home' onClick={onLogout} />
              </Link>
            </div>
            {children}
            {children ? (<div className='children' />) : null}
          </div>
        </div>
      }
    </UserContext.Consumer>
  )
}

Header.propTypes = {
  shadow: PropTypes.bool,
  onLogout: PropTypes.func,
  children: PropTypes.element,
  childrenHeight: PropTypes.number
}
