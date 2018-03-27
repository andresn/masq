import React from 'react'
import { Link } from 'react-router-dom'

import TextInput from 'components/TextInput/TextInput'
import Button from 'components/Button/Button'
import Separator from 'components/Separator'

import Avatar from 'components/Avatar/Avatar'

import Chevron from 'icons/Chevron'

import './Register.css'

export default function Register () {
  return (
    <div className='Register'>
      <Link to='login' className='goback'>
        <Chevron transform='rotate(90)' color='#458bf8' />
        <p>Go back to the users list</p>
      </Link>
      <h1>New User</h1>
      <div className='container'>
        <Avatar upload image='https://randomuser.me/api/portraits/women/21.jpg' />
        <TextInput label='Last Name' />
        <TextInput label='First Name' />
        <TextInput label='Username (displayed)' />
        <Separator />
        <Button label='Confirm' />
      </div>
    </div>
  )
}
