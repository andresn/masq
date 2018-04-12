import React from 'react'
import PropTypes from 'prop-types'

import { Chevron } from 'icons'
import { Card } from 'components'

export default class AppCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { enabled: props.app.enabled }
    this.onChecked = this.onChecked.bind(this)
  }

  onChecked (state) {
    this.setState({ enabled: state })
    this.props.onChecked(state)
  }

  render () {
    const { app } = this.props
    const style = this.state.enabled ? { color: app.color } : {}
    return (
      <Card title={app.name} description={app.description} color={app.color} enabled={this.state.enabled} image={app.image} onChecked={this.onChecked}>
        <div className='permissions'>
          <p>5 PERMISSIONS</p>
          <div className='more'>
            <p style={style}>SEE MORE</p>
            <Chevron className='caret-icon' style={style} />
          </div>
        </div>
      </Card>
    )
  }
}

AppCard.propTypes = {
  onChecked: PropTypes.func,
  app: PropTypes.object.isRequired
}
