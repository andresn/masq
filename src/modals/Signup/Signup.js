import React from 'react'

import { Avatar, Modal, Button, TextInput } from 'components'

import './Signup.css'

export default class Signup extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      image: { value: '', error: false },
      lastname: { value: '', error: false },
      firstname: { value: '', error: false },
      username: { value: '', error: false }
    }
    this.validate = this.validate.bind(this)
    this.openDialog = this.openDialog.bind(this)

    this.refAvatar = React.createRef()
  }

  onChange (field, event) {
    const value = event.target.value.trim()
    this.setState({
      [field]: {
        value: value,
        error: !value.length
      }
    })
  }

  onImageChange (event) {
    const file = event.target.files[0]
    if (!file) {
      return
    }

    const reader = new window.FileReader()

    reader.addEventListener('load', () => {
      this.setState({
        image: { value: reader.result, error: false }
      })
    })
    reader.readAsDataURL(file)
  }

  openDialog () {
    this.refAvatar.current.openDialog()
  }

  validate () {
    const { onSignup } = this.props
    const isValid = !Object.values(this.state).some(field => field.error)
    if (!isValid) return window.alert('Invalid form')

    // Re-create a simple object like { field: value }
    let fields = {}
    Object.keys(this.state).forEach((key, index) => {
      if (index > 3) return // ignore openDialog and others if any
      fields[key] = this.state[key].value
    })
    onSignup(fields)
  }

  render () {
    return (
      <Modal onClose={this.props.onClose} height={670} width={511}>
        <div className='Signup'>
          <h1>Add a new user</h1>
          <Avatar upload ref={this.refAvatar} onChange={(e) => this.onImageChange(e)} image={this.state.image.value || null} />
          <Button secondary label='IMPORT A PHOTO' onClick={this.openDialog} />

          <TextInput label='Last Name' error={this.state.lastname.error} onChange={(e) => this.onChange('lastname', e)} />
          <TextInput label='First Name' error={this.state.firstname.error} onChange={(e) => this.onChange('firstname', e)} />
          <TextInput label='Username (displayed)' error={this.state.username.error} onChange={(e) => this.onChange('username', e)} />

          <Button label='Finish' onClick={this.validate} />
        </div>
      </Modal>
    )
  }
}
