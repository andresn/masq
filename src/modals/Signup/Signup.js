import React from 'react'

import { Avatar, Modal, Button, TextInput } from 'components'

import './Signup.css'

export default class Signup extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      image: '',
      lastname: '',
      firstname: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }

    this.currentStep = 0
    this.validationEnabled = false
    this.refAvatar = React.createRef()

    this.next = this.next.bind(this)
    this.finish = this.finish.bind(this)
    this.isValid = this.isValid.bind(this)
    this.previous = this.previous.bind(this)
    this.openDialog = this.openDialog.bind(this)
  }

  isValid (fieldName) {
    if (!this.validationEnabled) {
      // Don't show error as long as the user do not click Finish btn
      return true
    }

    if (fieldName === 'image') return true
    if (fieldName === 'password') {
      return this.state[fieldName].length >= 8
    }
    if (fieldName === 'passwordConfirmation') {
      return this.state[fieldName] === this.state.password
    }

    return this.state[fieldName].length > 0
  }

  onChange (field, event) {
    const value = event.target.value.trim()
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

  openDialog () {
    this.refAvatar.current.openDialog()
  }

  next () {
    const fieldsToValidate = ['lastname', 'firstname', 'username']
    this.validationEnabled = true

    const isValid = fieldsToValidate.every(key => this.isValid(key))

    // If invalid, return
    if (!isValid) {
      // forceUpdate to show errors
      return this.forceUpdate()
    }

    this.validationEnabled = false // do not display error on the next step for now
    this.currentStep++
    this.forceUpdate()
  }

  previous () {
    this.currentStep--
    this.forceUpdate()
  }

  finish () {
    const { onSignup } = this.props
    this.validationEnabled = true

    if (!this.isValid('password')) {
      // forceUpdate to show errors
      return this.forceUpdate()
    }

    onSignup(this.state)
  }

  render () {
    return (
      <Modal onClose={this.props.onClose} height={670} width={511}>
        <div className='Signup'>
          <h1>Add a new user</h1>

          {this.currentStep === 0 && (
            <React.Fragment>
              <Avatar
                upload
                ref={this.refAvatar}
                onChange={(e) => this.onImageChange(e)}
                image={this.state.image || null}
              />
              <Button secondary label='IMPORT A PHOTO' onClick={this.openDialog} />

              <TextInput
                label='Last Name'
                error={!this.isValid('lastname')}
                defaultValue={this.state.lastname}
                onChange={(e) => this.onChange('lastname', e)}
              />
              <TextInput
                label='First Name'
                error={!this.isValid('firstname')}
                defaultValue={this.state.firstname}
                onChange={(e) => this.onChange('firstname', e)}
              />
              <TextInput
                label='Username (displayed)'
                error={!this.isValid('username')}
                defaultValue={this.state.username}
                onChange={(e) => this.onChange('username', e)}
              />

              <div className='buttons'>
                <Button label='Next' onClick={this.next} width={185} />
              </div>
            </React.Fragment>
          )}

          {this.currentStep === 1 && (
            <React.Fragment>
              <Avatar image={this.state.image} user={this.state} />
              <p className='user'>{this.state.username}</p>
              <TextInput
                password
                label='Password'
                labelError='Password must be at least 8 characters long'
                error={!this.isValid('password')}
                onChange={(e) => this.onChange('password', e)}
              />

              <TextInput
                password
                label='Password confirmation'
                labelError='Passwords do not match'
                error={!this.isValid('passwordConfirmation')}
                onChange={(e) => this.onChange('passwordConfirmation', e)}
              />

              <div className='buttons'>
                <Button label='Previous' onClick={this.previous} width={185} />
                <Button label='Finish' onClick={this.finish} width={185} />
              </div>
            </React.Fragment>
          )}
        </div>
      </Modal>
    )
  }
}
