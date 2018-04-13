import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, Button, Separator, TextInput, SwitchButton, CircleIndicator } from 'components'

import { UserContext } from 'context/user'

import './Settings.css'

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: { value: props.user.image, error: false },
      lastname: { value: props.user.lastname, error: false },
      firstname: { value: props.user.firstname, error: false },
      username: { value: props.user.username, error: false }
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
      this.setState({image: { value: reader.result, error: false }})
    })
    reader.readAsDataURL(file)
  }

  validate () {
    const { onUpdateUser } = this.props
    const isValid = !Object.values(this.state).some(field => field.error)
    if (!isValid) return window.alert('Invalid form')

    // Re-create a simple object like { field: value }
    let fields = {}
    Object.keys(this.state).forEach(key => {
      fields[key] = this.state[key].value
    })
    onUpdateUser(this.state)
  }

  render () {
    const { onDeleteUser } = this.props

    return (
      <div className='Settings'>
        <h2 style={{marginLeft: '16px'}}>Your Profile</h2>

        <div className='profile'>
          <Avatar upload image={this.state.image.value} onChange={(e) => this.onImageChange(e)} />
          <div className='fields'>
            <TextInput label='Last Name' error={this.state.lastname.error} defaultValue={this.state.lastname.value} onChange={(e) => this.onChange('lastname', e)} />
            <TextInput label='First Name' error={this.state.firstname.error} defaultValue={this.state.firstname.value} onChange={(e) => this.onChange('firstname', e)} />
            <TextInput label='Username (Displayed)' error={this.state.username.error} defaultValue={this.state.username.value} onChange={(e) => this.onChange('username', e)} />
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
          <Button label='SAVE CHANGES' onClick={this.validate} />
        </div>

        <Separator height='16px' />
        <div className='button-container'>
          <Button label='DELETE MY ACCOUNT' onClick={onDeleteUser} />
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
