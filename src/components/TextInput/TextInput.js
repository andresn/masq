import React from 'react'
import PropTypes from 'prop-types'

import './TextInput.css'

export default function TextInput (props) {
  return (
    <div className='TextInput'>
      <input type='text' defaultValue={props.defaultValue} />
      <label>{props.label}</label>
    </div>
  )
}

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired
}
