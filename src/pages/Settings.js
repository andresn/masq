import React from 'react'

import Button from '../components/Button/Button'
// import DeviceCard from '../components/DeviceCard';
import TextInput from '../components/TextInput/TextInput'

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
        <div className='avatar' />
        <div className='fields'>
          <TextInput label='Last Name' defaultValue={user.lastname} />
          <TextInput label='First Name' defaultValue={user.firstname} />
          <TextInput label='Username (Displayed)' defaultValue={user.pseudo} />
        </div>
      </div>

      <h1 style={{marginLeft: '16px'}}>Masq Parameters</h1>

      <div className='button-container'>
        <Button label='SUPPRIMER MON COMPTE' />
      </div>
    </div>
  )
}
