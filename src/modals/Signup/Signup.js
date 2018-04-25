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
    const reader = new window.FileReader()
    const file = event.target.files[0]
    reader.addEventListener('load', () => {
      this.setState({
        image: { value: reader.result, error: false }
      })
    })
    reader.readAsDataURL(file)
  }

  validate () {
    const { onSignup } = this.props
    const isValid = !Object.values(this.state).some(field => field.error)
    if (!isValid) return window.alert('Invalid form')

    // Re-create a simple object like { field: value }
    let fields = {}
    Object.keys(this.state).forEach(key => {
      fields[key] = this.state[key].value
    })
    onSignup(fields)
  }

  render () {
    return (
      <Modal onClose={this.props.onClose}>
        <div className='Signup'>
          <h1>Add a new user</h1>
          <Avatar upload onChange={(e) => this.onImageChange(e)} image={this.state.image.value || null} />
          <Button secondary label='IMPORT A PHOTO' />

          <TextInput label='Last Name' error={this.state.lastname.error} onChange={(e) => this.onChange('lastname', e)} />
          <TextInput label='First Name' error={this.state.firstname.error} onChange={(e) => this.onChange('firstname', e)} />
          <TextInput label='Username (displayed)' error={this.state.username.error} onChange={(e) => this.onChange('username', e)} />

          <Button label='Next' onClick={this.validate} />
        </div>
      </Modal>
    )
  }
}
