import React from 'react'
import PropTypes from 'prop-types'

import SwitchButton from 'components/SwitchButton/SwitchButton'

import './CardHeader.css'

export default function CardHeader (props) {
  const { color, enabled } = props
  const style = { backgroundColor: color }

  return (
    <div className='CardHeader'>
      <div className='line' style={style} />
      <SwitchButton color={color} checked={enabled} />
    </div>
  )
}
CardHeader.propTypes = {
  color: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired
}
