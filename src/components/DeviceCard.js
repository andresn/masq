import React from 'react';

const style = {
  width: '378px',
  height: '179px',
  backgroundColor: 'white',
  borderRadius: '6px',
  border: 'solid 1px #f2f2f2',
  margin: 'auto' // TODO: don't assume position
}

export default function DeviceCard(props) {
  const { device } = props;
  return (
    <div style={style}>
      <p>{device.name}</p>
    </div>
  );
}
