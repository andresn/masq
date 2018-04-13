import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Chevron } from 'icons'
import { TextInput, Button, Separator, Avatar } from 'components'

import './Register.css'

export default class Register extends React.Component {
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
    const { onRegister } = this.props
    const isValid = !Object.values(this.state).some(field => field.error)
    if (!isValid) return window.alert('Invalid form')

    // Re-create a simple object like { field: value }
    let fields = {}
    Object.keys(this.state).forEach(key => {
      fields[key] = this.state[key].value
    })
    onRegister(fields)
  }

  render () {
    return (
      <div className='Register'>
        <Link to='login' className='goback'>
          <Chevron transform='rotate(90)' color='#458bf8' />
          <h3>Go back to the users list</h3>
        </Link>
        <h1>New User</h1>
        <div className='container'>
          <Avatar upload onChange={(e) => this.onImageChange(e)} image={this.state.image.value || null} />
          <TextInput label='Last Name' error={this.state.lastname.error} onChange={(e) => this.onChange('lastname', e)} />
          <TextInput label='First Name' error={this.state.firstname.error} onChange={(e) => this.onChange('firstname', e)} />
          <TextInput label='Username (displayed)' error={this.state.username.error} onChange={(e) => this.onChange('username', e)} />
          <Separator />
          <Button label='Confirm' onClick={this.validate} />
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired
}
