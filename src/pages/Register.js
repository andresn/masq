import React from 'react'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'
// import Divider from ''

import './Register.css'

export default function Register () {
  return (
    <div className='Register'>
      <h1>New User</h1>
      <div className='container'>
        <div className='avatar' />
        <TextInput label='Last Name' />
        <TextInput label='First Name' />
        <TextInput label='Username (displayed)' />
        <Button label='Confirm' />
      </div>
    </div>
  )
}
