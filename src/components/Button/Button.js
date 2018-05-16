import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

export default function Button (props) {
  const { secondary, label, onClick } = props
  const classes = 'Button ' + (secondary ? 'secondary' : 'primary')

  return (
    <button style={{width: props.width}} className={classes} onClick={onClick}>{label}</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  label: PropTypes.string.isRequired
}
