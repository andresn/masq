import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import i18next from 'i18next'

import { Button } from 'components'

import DeviceCard from './DeviceCard/DeviceCard'
import { AddDevice } from 'modals'

import './Devices.css'

export default class Devices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpened: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal (state) {
    this.setState({
      isModalOpened: state
    })
  }

  render () {
    const { devices } = this.props

    return (
      <div className='Devices'>
        <div>
          {this.state.isModalOpened &&
            <AddDevice onClose={() => this.toggleModal(false)} />
          }
          {/* <div className='title-container'>
            <h1>Currently active</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
          </div>
          <div className='cards-grid'>
            {devices.map((device, index) =>
              <DeviceCard key={index} index={index} device={device} />
            )}
          </div> */}

          <div className='title-container'>
            <h1><Trans>My devices</Trans></h1>
            <h3><Trans>Find your devices connected to Masq</Trans></h3>
          </div>
          <div className='cards-grid'>
            {devices.map((device, index) =>
              <DeviceCard key={index} index={index} device={device} />
            )}
          </div>
        </div>
        <div className='sidebar'>
          <Button secondary width={200} label={i18next.t('ADD A NEW DEVICE')} onClick={() => this.toggleModal(true)} />
        </div>
      </div>
    )
  }
}

Devices.propTypes = {
  onChecked: PropTypes.func,
  onNewDevice: PropTypes.func,
  devices: PropTypes.array.isRequired // TODO: Check properties
}
