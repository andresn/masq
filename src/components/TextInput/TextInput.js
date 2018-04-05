import React from 'react'
import PropTypes from 'prop-types'

import './TextInput.css'

export default function TextInput (props) {
  const { label, defaultValue } = props
  return (
    <div className='TextInput'>
      <input type='text' defaultValue={defaultValue} />
      <label>{label}</label>
    </div>
  )
}

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired
}
