import React from 'react'

import { Avatar, Modal, Button, TextInput } from 'components'

import './Signup.css'

export default class Signup extends React.Component {
  render () {
    return (
      <Modal onClose={this.props.onClose}>
        <div className='Signup'>
          <h1>Add a new user</h1>
          <Avatar upload />
          <Button secondary label='IMPORT A PHOTO' />

          <TextInput label='Last Name' />
          <TextInput label='First Name' />
          <TextInput label='Username (displayed)' />

          <Button label='Next' />
        </div>
      </Modal>
    )
  }
}
