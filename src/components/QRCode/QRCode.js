import React from 'react'
import PropTypes from 'prop-types'

import './QRCode.css'

export default function QRCode (props) {
  const { image } = props
  const style = { backgroundImage: 'url(' + image + ')' }

  return <div className='QRCode' style={style} />
}

QRCode.propTypes = {
  image: PropTypes.string.isRequired
}
