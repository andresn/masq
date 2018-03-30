import React from 'react'
import PropTypes from 'prop-types'

import CardHeader from './CardHeader/CardHeader'

import './Card.css'

export default function Card (props) {
  const { image, title, description, color, enabled, children } = props

  const style = enabled
    ? { backgroundImage: 'url(' + image + ')' }
    : {
      backgroundImage: 'url(' + image + ')',
      filter: 'grayscale(50%)'
    }

  return (
    <div className='Card'>
      {image
        ? (<div className='image' style={style} />)
        : null}
      <div className='flex'>
        <div className='content'>
          <CardHeader className='CardHeader' color={color} enabled={enabled} onChecked={props.onChecked} />
          <h1 className='title'>{title}</h1>
          <p className='description'>{description}</p>
          {children}
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  image: PropTypes.string,
  children: PropTypes.element,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onChecked: PropTypes.func
}
