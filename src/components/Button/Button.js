import React from 'react'

import './Button.css'

export default function Button (props) {
  const classes = 'Button ' + (props.secondary ? 'secondary' : 'primary')
  return (
    <button className={classes}>
      {props.label}
    </button>
  )
}
