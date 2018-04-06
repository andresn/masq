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
      image: '',
      lastname: '',
      firstname: '',
      username: ''
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
    const { onRegister } = this.props

    return (
      <div className='Register'>
        <Link to='login' className='goback'>
          <Chevron transform='rotate(90)' color='#458bf8' />
          <h3>Go back to the users list</h3>
        </Link>
        <h1>New User</h1>
        <div className='container'>
          <Avatar upload onChange={(e) => this.onImageChange(e)} image={this.state.image || null} />
          <TextInput label='Last Name' onChange={(e) => this.onChange('lastname', e)} />
          <TextInput label='First Name' onChange={(e) => this.onChange('firstname', e)} />
          <TextInput label='Username (displayed)' onChange={(e) => this.onChange('username', e)} />
          <Separator />
          <Button label='Confirm' onClick={() => onRegister(this.state)} />
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired
}
