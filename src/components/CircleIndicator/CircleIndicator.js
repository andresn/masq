import React from 'react'

import './CircleIndicator.css'

export default function CircleIndicator (props) {
  return (
    <div className='circlestatus' style={{border: 'solid 2px' + props.color}} />
  )
}
