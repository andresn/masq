import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Avatar from 'components/Avatar/Avatar'

import Chevron from 'icons/Chevron'
import Home from 'icons/Home'

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
      <Avatar image='https://randomuser.me/api/portraits/women/21.jpg' />
      <span id='avatar-text' style={{fontSize: '14px'}}>{props.username}</span>
      <Chevron className='caret' />
    </div>
  )
}

export default function Header (props) {
  const {username, shadow} = props

  return (
    <div className={'Header' + (shadow ? ' shadow' : '')}>
      <div id='top-section'>
        {username ? <AvatarSection username={username} /> : <TitleSection /> }
        <Link to='login'>
          <Home className='home' onClick={props.onLogout} />
        </Link>
      </div>
      {props.children}
      {props.children ? (<div className='children' />) : null}
    </div>
  )
}

Header.propTypes = {
  shadow: PropTypes.bool,
  onLogout: PropTypes.func,
  username: PropTypes.string,
  children: PropTypes.element
}
