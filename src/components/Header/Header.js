import React from 'react'
import ReactSVG from 'react-svg'

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

export default function Header (props) {
  const {username} = props

  return (
    <div className='Header'>
      <div style={style}>
        <div id='avatar-section'>
          <span id='avatar' />
          <span id='avatar-text' style={{fontSize: '14px'}}>{username}</span>
          <ReactSVG className='caret' path='/assets/Chevron.svg' />
        </div>
        <div>
          <ReactSVG className='home' path='/assets/Home.svg' />
        </div>
        {/* <img className="home" src="/assets/Home.svg" alt="homeLogo"/> */}
      </div>
      {props.children}
      {/* <div style={{height: '16px'}}></div> */}
    </div>
  )
}
