import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'

import { Card, CircleIndicator } from 'components'

function SyncStatus (props) {
  return (
    <div className='syncstatus'>
      <CircleIndicator color={props.color} />
      <p style={{marginLeft: 8}}><Trans>Now</Trans></p>
    </div>
  )
}

export default class DeviceCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      enabled: props.device.enabled
    }
  }

  onChecked (index, state) {
    const { onChecked } = this.props
    this.setState({ enabled: state })
    if (onChecked) { onChecked(index, state) }
  }

  render () {
    const { device, index } = this.props
    return (
      <div>
        <Card title={device.name} color={device.color} enabled={this.state.enabled} onChecked={(state) => this.onChecked(index, state)}>
          <div className='lastsync'>
            <p><Trans>LAST SYNCHRONIZATION</Trans></p>
            <SyncStatus color={this.state.enabled ? device.color : 'var(--blue-100)'} />
          </div>
        </Card>
      </div>
    )
  }
}

DeviceCard.propTypes = {
  enabled: PropTypes.bool,
  onChecked: PropTypes.func
}

SyncStatus.propTypes = {
  color: PropTypes.string.isRequired
}
