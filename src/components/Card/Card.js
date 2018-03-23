import React from 'react'
import PropTypes from 'prop-types'

import CardHeader from './CardHeader/CardHeader'

import './Card.css'

export default class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = { enabled: props.enabled }
    this.toggleState = this.toggleState.bind(this)
  }

  toggleState () {
    this.setState({ enabled: !this.state.enabled })
  }

  render () {
    const { image, title, description, color, enabled, children } = this.props

    return (
      <div className='Card'>
        {image
          ? (<div className='image'
            style={{backgroundImage: 'url(' + image + ')'}}
          />)
          : null}
        <div className='flex'>
          <div id='content'>
            <CardHeader className='CardHeader' color={color} enabled={enabled} />
            <h1 className='title'>{title}</h1>
            <p className='description'>{description}</p>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  image: PropTypes.string,
  children: PropTypes.element,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired
}
