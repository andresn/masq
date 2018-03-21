import React from 'react'

import './CircleIndicator.css'

export default function CircleIndicator (props) {
  console.log(props)
  return (
    <div className='circlestatus' style={{border: 'solid 2px' + props.color}} />
  )
}
