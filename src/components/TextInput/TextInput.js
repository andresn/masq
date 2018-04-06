import React from 'react'
import PropTypes from 'prop-types'

import './TextInput.css'

export default function TextInput (props) {
  const { label, defaultValue, onChange } = props
  return (
    <div className='TextInput'>
      <input type='text' defaultValue={defaultValue} onChange={onChange} />
      <label>{label}</label>
    </div>
  )
}

TextInput.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired
}
