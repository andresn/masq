import React from 'react'

import CardHeader from './CardHeader/CardHeader'

import './Card.css'

export default class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = { enabled: props.enabled }
    this.toggleState = this.toggleState.bind(this)
  }

  toggleState () {
    this.setState({
      enabled: !this.state.enabled
    })
  }

  render () {
    const { image, title, description, color, enabled } = this.props

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
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
