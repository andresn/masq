import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, TextInput, Button } from 'components'

import { UserContext } from 'context/user'

import './Settings.css'

class Settings extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      image: props.user.image,
      lastname: props.user.lastname,
      firstname: props.user.firstname,
      username: props.user.username
    }

    this.hasChanged = false

    this.validate = this.validate.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  isValid (fieldName) {
    if (fieldName === 'image') return true
    return this.state[fieldName].length > 0
  }

  onChange (field, event) {
    const value = event.target.value.trim()
    this.hasChanged = true
    this.setState({
      [field]: value
    })
  }

  onImageChange (event) {
    const reader = new window.FileReader()
    const file = event.target.files[0]
    if (!file) {
      return
    }

    reader.addEventListener('load', () => {
      this.setState({ image: reader.result })
    })
    reader.readAsDataURL(file)
  }

  validate () {
    if (!this.hasChanged) {
      return
    }

    const { onUpdateUser } = this.props
    // Every fields should be valid
    const isValid = Object.keys(this.state).every(key => this.isValid(key))
    // If invalid, return
    if (!isValid) {
      // forceUpdate to show errors
      return this.forceUpdate()
    }

    onUpdateUser(this.state)
    this.hasChanged = false
  }

  render () {
    // const { onDeleteUser } = this.props

    return (
      <div className='Settings'>
        <div>
          <div className='title-container'>
            <h1>Your profile</h1>
            <h3>Edit your personal informations</h3>
          </div>

          <div className='profile'>
            <Avatar upload image={this.state.image} onChange={(e) => this.onImageChange(e)} />
            <div className='inputs'>
              <TextInput
                label='Last Name'
                error={!this.isValid('lastname')}
                defaultValue={this.state.lastname} onChange={(e) => this.onChange('lastname', e)}
              />
              <TextInput
                label='First Name'
                error={!this.isValid('firstname')}
                defaultValue={this.state.firstname} onChange={(e) => this.onChange('firstname', e)}
              />
              <TextInput
                label='Username (Displayed)'
                error={!this.isValid('username')}
                defaultValue={this.state.username} onChange={(e) => this.onChange('username', e)}
              />
            </div>
          </div>

          {/* <div className='title-container'>
            <h1>Qwant Masq settings</h1>
            <h3>Edit app's behavior</h3>
          </div>

          <div className='app-settings'>
            <div style={{marginRight: 16}}>
              <CircleIndicator color='#458bf8' />
            </div>
            <p style={{marginRight: 16}}>Accept new applications automatically</p>
            <SwitchButton checked secondary color='#458bf8' />
          </div> */}
        </div>

        <div className='sidebar'>
          <Button width={200} secondary={!this.hasChanged} label='SAVE' onClick={this.validate} />
        </div>
      </div>
    )
  }
}

export default props => (
  <UserContext.Consumer>
    {user => <Settings {...props} user={user} />}
  </UserContext.Consumer>
)

Settings.propTypes = {
  user: PropTypes.object.isRequired,
  onUpdateUser: PropTypes.func,
  onDeleteUser: PropTypes.func
}
