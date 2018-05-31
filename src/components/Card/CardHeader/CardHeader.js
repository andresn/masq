import React from 'react'
import PropTypes from 'prop-types'

import { SwitchButton } from 'components'
import { Trash } from 'icons'

import ButtonsGroup from './ButtonsGroup'

import './CardHeader.css'

export default function CardHeader (props) {
  const { color, enabled, onChecked, onTrash } = props
  const style = { backgroundColor: enabled ? color : 'var(--blue-100)' }

  return (
    <div className='CardHeader'>
      <div className='line' style={style} />
      {onTrash
        ? (
          <div className='right'>
            <SwitchButton color={color} checked={enabled} onChecked={onChecked} />
            <ButtonsGroup
              buttons={[
                <Trash color='#191919' style={{opacity: 0.5, cursor: 'pointer'}} onClick={onTrash} />
              ]}
            />
          </div>
        )
        : <SwitchButton color={color} checked={enabled} onChecked={onChecked} />
      }
    </div>
  )
}
CardHeader.propTypes = {
  color: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onChecked: PropTypes.func,
  onTrash: PropTypes.func
}
