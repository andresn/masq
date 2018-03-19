import React from 'react';

import SwitchButton from '../../SwitchButton/SwitchButton';

import './CardHeader.css';

// TODO: Add image in header
export default function CardHeader(props) {
  const { color } = props;
  const style = { backgroundColor: color };

  return (
    <div>
      <div className="CardHeader">
        <div className="line" style={style} />
        <SwitchButton color={color} />
      </div>
    </div>
  );
}
