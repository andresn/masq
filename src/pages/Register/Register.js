import React from 'react'
import { Link } from 'react-router-dom'

import { Chevron } from 'icons'
import { TextInput, Button, Separator, Avatar } from 'components'

import './Register.css'

export default function Register () {
  return (
    <div className='Register'>
      <Link to='login' className='goback'>
        <Chevron transform='rotate(90)' color='#458bf8' />
        <h3>Go back to the users list</h3>
      </Link>
      <h1>New User</h1>
      <div className='container'>
        <Avatar upload />
        <TextInput label='Last Name' />
        <TextInput label='First Name' />
        <TextInput label='Username (displayed)' />
        <Separator />
        <Button label='Confirm' />
      </div>
    </div>
  )
}
