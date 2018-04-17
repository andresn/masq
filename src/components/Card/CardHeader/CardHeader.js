import React from 'react'
import PropTypes from 'prop-types'

import { SwitchButton } from 'components'

import './CardHeader.css'

export default function CardHeader (props) {
  const { color, enabled, onChecked } = props
  const style = { backgroundColor: enabled ? color : 'var(--grey2-color)' }

  return (
    <div className='CardHeader'>
      <div className='line' style={style} />
      <SwitchButton color={color} checked={enabled} onChecked={onChecked} />
    </div>
  )
}
CardHeader.propTypes = {
  color: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onChecked: PropTypes.func
}
