import React from 'react'
import PropTypes from 'prop-types'

import { Button, Card, Separator, CircleIndicator } from 'components'

import './Devices.css'

function SyncStatus (props) {
  return (
    <div className='syncstatus'>
      <CircleIndicator color={props.color} />
      <p>10 days ago</p>
    </div>
  )
}

function DeviceRow (props) {
  const { device, index } = props
  return (
    <div>
      <Card title={device.name} color={device.color} enabled={device.enabled} onChecked={() => props.onChecked(index)}>
        <div className='lastsync'>
          <p>LAST SYNCHRONIZATION</p>
          <SyncStatus color={device.enabled ? device.color : '#b2b2b2'} />
        </div>
      </Card>
      <Separator />
    </div>
  )
}

export default function Devices (props) {
  const { devices, onChecked } = props
  const newDeviceKey = devices.findIndex(dev => dev.new)

  return (
    <div style={{paddingBottom: '64px'}}>
      <h2 style={{marginLeft: '16px'}}>New Device</h2>
      <div className='Devices'>
        {newDeviceKey !== -1
          ? <DeviceRow index={newDeviceKey} device={devices[newDeviceKey]} onChecked={onChecked} />
          : null
        }
      </div>

      <h2 style={{marginLeft: '16px'}}>My devices connected to Masq</h2>
      <div className='Devices'>
        {devices.map((device, index) => (
          !device.new
            ? <DeviceRow key={index} index={index} device={device} onChecked={onChecked} />
            : null
        ))}
        <Separator />
        <Button label='Add a new device' onClick={props.onNewDevice} />
      </div>
    </div>
  )
}

Devices.propTypes = {
  devices: PropTypes.array.isRequired, // TODO: Check properties
  onChecked: PropTypes.func
}
