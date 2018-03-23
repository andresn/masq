import React from 'react'
import PropTypes from 'prop-types'

import './SwitchButton.css'

export default class SwitchButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { checked: this.props.checked || false }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({ checked: !this.state.checked })
    if (this.props.onClick) this.props.onClick()
  }

  render () {
    const { secondary, color } = this.props
    const label = this.state.checked ? 'ENABLED' : 'DISABLED'
    const translation = secondary ? '32px' : '26px'
    const cursorStyle = this.state.checked ? {
      transform: 'translate3d(' + translation + ', 0, 0)'
    } : {}
    const backgroundStyle = this.state.checked ? {
      backgroundColor: color
    } : {}

    return (
      <div className='SwitchButton'>
        {!this.props.secondary ? (<label>{label}</label>) : null}
        <div id='switch-container' className={secondary ? 'secondary' : ''} onClick={this.toggle}>
          <div id='background' className={secondary ? 'secondary' : ''} style={backgroundStyle} />
          <div id='cursor' className={secondary ? 'secondary' : ''}
            style={cursorStyle}
          />
        </div>
      </div>
    )
  }
}

SwitchButton.propTypes = {
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
}
