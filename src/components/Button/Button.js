import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

export default function Button (props) {
  const { secondary, label } = props
  const classes = 'Button ' + (secondary ? 'secondary' : 'primary')

  return (
    <button className={classes}>{label}</button>
  )
}

Button.propTypes = {
  secondary: PropTypes.bool,
  label: PropTypes.string.isRequired
}
