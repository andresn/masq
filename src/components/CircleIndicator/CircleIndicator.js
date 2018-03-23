import React from 'react'
import PropTypes from 'prop-types'

import './CircleIndicator.css'

export default function CircleIndicator (props) {
  const { color } = props
  return (
    <div className='CircleIndicator' style={{border: 'solid 2px' + color}} />
  )
}

CircleIndicator.propTypes = {
  color: PropTypes.string.isRequired
}
