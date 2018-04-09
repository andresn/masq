import React from 'react'

import './QRCode.css'

export default function QRCode (props) {
  const { image } = props
  const style = { backgroundImage: 'url(' + image + ')' }

  return <div className='QRCode' style={style} />
}
