import React from 'react'

import './SwitchButton.css'

export default class SwitchButton extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  componentWillMount () {
    this.setState({
      checked: this.props.checked || false
    })
  }

  toggle () {
    this.setState({
      checked: !this.state.checked
    })
    if (this.props.onClick) this.props.onClick()
  }

  render () {
    const translation = this.props.secondary ? '32px' : '26px'
    const cursorStyle = this.state.checked ? {
      transform: 'translate3d(' + translation + ', 0, 0)'
    } : {}
    const backgroundStyle = this.state.checked ? {
      backgroundColor: this.props.color
    } : {}

    const label = this.state.checked ? 'ENABLED' : 'DISABLED'

    return (
      <div className='SwitchButton'>
        {!this.props.secondary ? (<label>{label}</label>) : null}
        <div className={'switch-container' + (this.props.secondary ? ' secondary' : '')} onClick={this.toggle}>
          <div className={'background' + (this.props.secondary ? ' secondary' : '')} style={backgroundStyle} />
          <div className={'cursor' + (this.props.secondary ? ' secondary' : '')}
            style={cursorStyle}
          />
        </div>
      </div>
    )
  }
}
