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

export default class Devices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: props.user.image,
      lastname: props.user.lastname,
      firstname: props.user.firstname,
      username: props.user.username
    }
  }

  onChange (field, event) {
    this.setState({[field]: event.target.value})
  }

  onImageChange (event) {
    const reader = new window.FileReader()
    const file = event.target.files[0]
    reader.addEventListener('load', () => {
      this.setState({image: reader.result})
    })
    reader.readAsDataURL(file)
  }

  render () {
    const { onUpdateUser, onDeleteUser } = this.props

    return (
      <div className='Settings'>

        <h2 style={{marginLeft: '16px'}}>Your Profile</h2>

        <div className='profile'>
          <Avatar upload image={this.state.image} onChange={(e) => this.onImageChange(e)} />
          <div className='fields'>
            <TextInput label='Last Name' defaultValue={this.state.lastname} onChange={(e) => this.onChange('lastname', e)} />
            <TextInput label='First Name' defaultValue={this.state.firstname} onChange={(e) => this.onChange('firstname', e)} />
            <TextInput label='Username (Displayed)' defaultValue={this.state.username} onChange={(e) => this.onChange('username', e)} />
          </div>
        </div>

        <h2 style={{marginLeft: '16px'}}>Masq Parameters</h2>

        <div className='parameters'>
          <CircleIndicator style={{alignSelf: 'flex-start'}} color='#458bf8' />
          <p>Accept new applications automatically</p>
          <SwitchButton checked secondary color='#458bf8' />
        </div>

        <Separator height='48px' />
        <div className='button-container'>
          <Button label='SAVE CHANGES' onClick={() => onUpdateUser(this.state)} />
        </div>

        <Separator height='16px' />
        <div className='button-container'>
          <Button label='DELETE MY ACCOUNT' onClick={onDeleteUser} />
        </div>
      </div>
    )
  }
}

Devices.propTypes = {
  user: PropTypes.object.isRequired
}
