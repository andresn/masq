import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

export default function Button (props) {
  const classes = 'Button ' + (props.secondary ? 'secondary' : 'primary')
  return (
    <button className={classes}>
      {props.label}
    </button>
  )
}

Button.propTypes = {
  secondary: PropTypes.bool,
  label: PropTypes.string.isRequired
}
