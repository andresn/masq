import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

export default class Button extends React.Component {
  constructor (props) {
    const { color } = props

    super(props)
    this.state = {
      style: {
        width: props.width,
        backgroundColor: color,
        border: `solid 2px ${color}`
      }
    }

    this.applyShadow = this.applyShadow.bind(this)
    this.removeShadow = this.removeShadow.bind(this)
  }

  applyShadow () {
    const { secondary, colorShadow } = this.props
    // Apply only for primary button
    if (secondary || !colorShadow) return
    const newStyle = Object.assign({}, this.state.style)
    newStyle['boxShadow'] = `0 10px 16px 0 rgba(0, 0, 0, 0.16), 0 10px 16px 0 ${colorShadow}`
    this.setState({ style: newStyle })
  }

  removeShadow () {
    const newStyle = Object.assign({}, this.state.style)
    delete newStyle['boxShadow']
    this.setState({ style: newStyle })
  }

  render () {
    const { secondary, label, onClick } = this.props
    const classes = 'Button ' + (secondary ? 'secondary' : 'primary')

    return (
      <button
        style={this.state.style}
        className={classes}
        onClick={onClick}
        onMouseEnter={this.applyShadow}
        onMouseLeave={this.removeShadow}>
        {label}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  label: PropTypes.string.isRequired
}
