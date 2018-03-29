import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button/Button'
import Card from 'components/Card/Card'
import Separator from 'components/Separator'
import CircleIndicator from 'components/CircleIndicator/CircleIndicator'

import './Devices.css'

function LastDevices (props) {
  const { device } = props
  if (!device) return

  return (
    <div>
      <h1 style={{marginLeft: '16px'}}>Nouvel appareil</h1>
      <div className='Devices'>
        <div>
          <Card title={device.name} color={device.color} enabled={device.enabled} onChecked={props.onChecked}>
            <div className='lastsync'>
              <p>LAST SYNCHRONIZATION</p>
              <SyncStatus color={device.enabled ? device.color : '#b2b2b2'} />
            </div>
          </Card>
          <Separator />
        </div>
      </div>
    </div>
  )
}

function SyncStatus (props) {
  return (
    <div className='syncstatus'>
      <CircleIndicator color={props.color} />
      <p>10 days ago</p>
    </div>
  )
}

export default function Devices (props) {
  const newDevice = { name: 'TV de Margaux', color: '#86e991', enabled: true }
  const { devices } = props

  return (
    <div style={{ backgroundColor: '#f5f7fa', paddingTop: '1px' }}>
      <LastDevices device={newDevice} />

      <h1 style={{marginLeft: '16px'}}>Mes appareils connectés à Masq</h1>
      <div className='Devices'>
        {devices.map((device, index) => (
          <div key={index}>
            <Card title={device.name} color={device.color} enabled={device.enabled} onChecked={() => props.onChecked(index)}>
              <div className='lastsync'>
                <p>LAST SYNCHRONIZATION</p>
                <SyncStatus color={device.enabled ? device.color : '#b2b2b2'} />
              </div>
            </Card>
            <Separator />
          </div>
        ))}
        <Separator />
        <Button label='Add a new device' />
      </div>
    </div>
  )
}

Devices.propTypes = {
  devices: PropTypes.array.isRequired, // TODO: Check properties
  onChecked: PropTypes.func
}
