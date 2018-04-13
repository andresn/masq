import React from 'react'
import PropTypes from 'prop-types'

import { Button, Separator } from 'components'

import DeviceCard from './DeviceCard/DeviceCard'

import './Devices.css'

export default function Devices (props) {
  const { devices, onChecked, onNewDevice } = props
  const newDeviceKey = devices.findIndex(dev => dev.new)

  return (
    <div style={{paddingBottom: '64px'}}>
      <h2 style={{marginLeft: '16px'}}>New Device</h2>
      <div className='Devices'>
        {newDeviceKey !== -1
          ? <DeviceCard index={newDeviceKey} device={devices[newDeviceKey]} onChecked={onChecked} />
          : null
        }
      </div>

      <h2 style={{marginLeft: '16px'}}>My devices connected to Masq</h2>
      <div className='Devices'>
        {devices.map((device, index) => (
          !device.new
            ? <DeviceCard key={index} index={index} device={device} onChecked={onChecked} />
            : null
        ))}
        <Separator />
        <Button label='Add a new device' onClick={onNewDevice} />
      </div>
    </div>
  )
}

Devices.propTypes = {
  onChecked: PropTypes.func,
  onNewDevice: PropTypes.func,
  devices: PropTypes.array.isRequired // TODO: Check properties
}
