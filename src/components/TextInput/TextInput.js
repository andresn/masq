import React from 'react';

import './TextInput.css';

export default function TextInput(props) {
  return (
    <div className="TextInput">
      <input type="text"/>
      <label>{props.label}</label>
    </div>
  )
}
