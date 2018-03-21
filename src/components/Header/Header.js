import React from 'react'

import Chevron from '../../icons/Chevron'
import Home from '../../icons/Home'

import './Header.css'

const style = {
  height: '64px',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  marginLeft: '16px',
  marginRight: '16px'
}

function TitleSection (props) {
  return (
    <div className='title-section'>
      <p className='title'>Masq</p>
      <p>&nbsp;by Qwant</p>
    </div>
  )
}

function AvatarSection (props) {
  return (
    <div id='avatar-section'>
      <span id='avatar' />
      <span id='avatar-text' style={{fontSize: '14px'}}>{props.username}</span>
      <Chevron className='caret' />
    </div>
  )
}

export default function Header (props) {
  const {username, shadow} = props

  return (
    <div className={'Header' + (shadow ? ' shadow' : '')}>
      <div style={style}>
        {username ? <AvatarSection username={username} /> : <TitleSection /> }
        <Home className='home' />
      </div>
      {props.children}
      {props.children ? (<div className='children' />) : null}
    </div>
  )
}
