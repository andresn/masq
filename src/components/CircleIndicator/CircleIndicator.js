import React from 'react'
import PropTypes from 'prop-types'

import './CircleIndicator.css'

export default function CircleIndicator (props) {
  return (
    <div className='circlestatus' style={{border: 'solid 2px' + props.color}} />
  )
}

CircleIndicator.propTypes = {
  color: PropTypes.string.isRequired
}
