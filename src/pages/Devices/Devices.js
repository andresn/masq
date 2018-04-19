import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components'

import DeviceCard from './DeviceCard/DeviceCard'

import './Devices.css'

export default function Devices (props) {
  const { devices } = props
  // const newDeviceKey = devices.findIndex(dev => dev.new)

  return (
    <div className='Devices'>
      <div>
        <h2>Currently active</h2>
        <div className='cards-grid'>
          {devices.map((device, index) =>
            <DeviceCard key={index} index={index} device={device} />
          )}
        </div>

        <h2>My devices</h2>
        <div className='cards-grid'>
          {devices.map((device, index) =>
            <DeviceCard key={index} index={index} device={device} />
          )}
        </div>
      </div>
      <div className='sidebar'>
        <Button secondary label='ADD A NEW DEVICE' />
      </div>
    </div>
  )
}

Devices.propTypes = {
  onChecked: PropTypes.func,
  onNewDevice: PropTypes.func,
  devices: PropTypes.array.isRequired // TODO: Check properties
}
