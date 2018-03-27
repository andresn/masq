import React from 'react'

import Separator from 'components/Separator'
import Button from 'components/Button/Button'
import TextInput from 'components/TextInput/TextInput'
import SwitchButton from 'components/SwitchButton/SwitchButton'
import CircleIndicator from 'components/CircleIndicator/CircleIndicator'
import Avatar from 'components/Avatar/Avatar'

import './Settings.css'

export default function Devices (props) {
  const user = {
    lastname: 'Bonneville',
    firstname: 'Geoffrey',
    pseudo: 'G-Ray'
  }

  return (
    <div className='Settings' style={{ backgroundColor: '#f5f7fa', paddingTop: '1px' }}>

      <h1 style={{marginLeft: '16px'}}>Your Profile</h1>

      <div className='profile'>
        <Avatar />
        <div className='fields'>
          <TextInput label='Last Name' defaultValue={user.lastname} />
          <TextInput label='First Name' defaultValue={user.firstname} />
          <TextInput label='Username (Displayed)' defaultValue={user.pseudo} />
        </div>
      </div>

      <h1 style={{marginLeft: '16px'}}>Masq Parameters</h1>

      <div className='parameters'>
        <CircleIndicator style={{alignSelf: 'flex-start'}} color='#458bf8' />
        <p>Accept new applications automatically automaticallyautomatically</p>
        <SwitchButton checked secondary color='#458bf8' />
      </div>

      <Separator />
      <div className='button-container'>
        <Button label='SUPPRIMER MON COMPTE' />
      </div>
    </div>
  )
}
