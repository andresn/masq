import React from 'react'
import PropTypes from 'prop-types'

import { Card } from 'components'
import { Qrcode } from 'icons'

export default class AppCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { enabled: props.app.enabled }
    this.onChecked = this.onChecked.bind(this)
  }

  onChecked (state) {
    this.setState({ enabled: state })
    // this.props.onChecked(state)
  }

  render () {
    const { app } = this.props
    return (
      <Card
        logo={app.logo}
        title={app.name}
        description={app.description}
        color={app.color || 'var(--green-100)'}
        enabled={this.state.enabled}
        image={app.image}
        onChecked={this.onChecked}
      >
        <Qrcode style={{float: 'right'}} color={this.state.enabled ? app.color : 'var(--blue-100)'} />
      </Card>
    )
  }
}

AppCard.propTypes = {
  onChecked: PropTypes.func,
  app: PropTypes.object.isRequired
}
