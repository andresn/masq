import React from 'react'
import PropTypes from 'prop-types'

import {
  Avatar,
  Button,
  Separator,
  TextInput,
  SwitchButton,
  CircleIndicator
} from 'components'

import './Settings.css'

export default function Devices (props) {
  const { user } = props

  return (
    <div className='Settings'>

      <h2 style={{marginLeft: '16px'}}>Your Profile</h2>

      <div className='profile'>
        <Avatar upload image={user.image} />
        <div className='fields'>
          <TextInput label='Last Name' defaultValue={user.lastname} />
          <TextInput label='First Name' defaultValue={user.firstname} />
          <TextInput label='Username (Displayed)' defaultValue={user.username} />
        </div>
      </div>

      <h2 style={{marginLeft: '16px'}}>Masq Parameters</h2>

      <div className='parameters'>
        <CircleIndicator style={{alignSelf: 'flex-start'}} color='#458bf8' />
        <p>Accept new applications automatically</p>
        <SwitchButton checked secondary color='#458bf8' />
      </div>

      <Separator />
      <div className='button-container'>
        <Button label='DELETE MY ACCOUNT' />
      </div>
    </div>
  )
}

Devices.propTypes = {
  user: PropTypes.object.isRequired
}
