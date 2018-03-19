import React from 'react';

import './Header.css';

const style = {
  height: '64px',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'left',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  marginLeft: '16px',
  marginRight: '16px'
}

export default function Header(props) {

  const {username} = props

  return (
    <div className="Header">
      <div style={style}>
        <div id="avatar-section">
          <span id="avatar"></span>
          <span id="avatar-text" style={{fontSize: '14px'}}>{username}</span>
          <span id="caret">
            <img src="/assets/Chevron.svg" alt="chevron"/>
          </span>
        </div>
        <img className="home" src="/assets/Home.svg" alt="homeLogo"/>
      </div>
      {props.children}
      <div style={{height: '16px'}}></div>
    </div>
  );
}
