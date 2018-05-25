import React from 'react'
import PropTypes from 'prop-types'

import './TextInput.css'

export default function TextInput (props) {
  const { error, label, labelError, defaultValue, onChange, password, focus } = props
  const classes = 'TextInput' + (error ? ' error' : '')
  const displayedLabel = (error && labelError) ? labelError : label

  return (
    <div className={classes}>
      <input type={password ? 'password' : 'text'} autoFocus={focus} defaultValue={defaultValue} onChange={onChange} onKeyUp={props.onKeyUp} />
      <label>{displayedLabel}</label>
    </div>
  )
}

TextInput.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string,
  onKeyUp: PropTypes.func,
  labelError: PropTypes.string,
  onChange: PropTypes.func,
  password: PropTypes.bool,
  defaultValue: PropTypes.string,
  focus: PropTypes.bool
}
