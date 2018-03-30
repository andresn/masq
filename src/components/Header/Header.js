import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Avatar } from 'components'
import { Chevron, Home } from 'icons'

import './Header.css'

function TitleSection (props) {
  return (
    <div id='title-section'>
      <p id='title'>Masq</p>
      <p>&nbsp;by Qwant</p>
    </div>
  )
}

function AvatarSection (props) {
  return (
    <div id='avatar-section'>
      <Avatar image={props.image} />
      <span id='avatar-text' style={{fontSize: '14px'}}>{props.username}</span>
      <Chevron className='caret' />
    </div>
  )
}

export default function Header (props) {
  const { user, shadow, children, onLogout, childrenHeight } = props
  const height = childrenHeight ? 80 + childrenHeight : 64

  return (
    <div>
      <div id='invisible' style={{height: height}} />
      <div className={'Header' + (shadow ? ' shadow' : '')}>
        <div id='top-section'>
          {user ? <AvatarSection username={user.firstname} image={user.image} /> : <TitleSection /> }
          <Link to='login'>
            <Home className='home' onClick={onLogout} />
          </Link>
        </div>
        {children}
        {children ? (<div className='children' />) : null}
      </div>
    </div>
  )
}

Header.propTypes = {
  shadow: PropTypes.bool,
  onLogout: PropTypes.func,
  user: PropTypes.object,
  children: PropTypes.element
}
