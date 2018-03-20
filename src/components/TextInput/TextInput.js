import React from 'react'

import './TextInput.css'

export default function TextInput (props) {
  return (
    <div className='TextInput'>
      <input type='text' defaultValue={props.defaultValue} />
      <label>{props.label}</label>
    </div>
  )
}
