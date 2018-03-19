import React from 'react';

import './Notification.css';

const style = {
  width: '378px',
  height: '40px',
  borderRadius: '3px',
  border: 'solid 1px #e5e5e5',
  margin: 'auto',
  verticalAlign: 'middle',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default function Notification(props) {
  return (
    <div style={style}>
      <div id="notif">
        <img style={{ height: '15px', marginLeft: '16px', 'marginRight': '16px' }} src='/assets/Infos.svg' alt="infos logo" />
        <p>{props.text}</p>
      </div>
      <img style={{ height: '9px', marginRight: '16px' }} src='/assets/Close.svg' alt="close logo" />
    </div>
  );
}
