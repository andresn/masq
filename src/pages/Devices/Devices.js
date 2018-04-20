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
        <div className='title-container'>
          <h1>Currently active</h1>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        </div>
        <div className='cards-grid'>
          {devices.map((device, index) =>
            <DeviceCard key={index} index={index} device={device} />
          )}
        </div>

        <div className='title-container'>
          <h1>My devices</h1>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        </div>
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
