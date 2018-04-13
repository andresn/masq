import React from 'react'
import PropTypes from 'prop-types'

import './TextInput.css'

export default function TextInput (props) {
  const { error, label, defaultValue, onChange } = props
  const classes = 'TextInput' + (error ? ' error' : '')
  return (
    <div className={classes}>
      <input type='text' defaultValue={defaultValue} onChange={onChange} />
      <label>{label}</label>
    </div>
  )
}

TextInput.propTypes = {
  error: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired
}
