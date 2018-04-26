import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, Button, TextInput, SwitchButton, CircleIndicator } from 'components'

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
    // const { onDeleteUser } = this.props

    return (
      <div className='Settings'>
        <div>
          <div className='title-container'>
            <h1>Your profile</h1>
            <h3>Edit your personal informations</h3>
          </div>

          <div className='profile'>
            <Avatar upload image={this.state.image.value} onChange={(e) => this.onImageChange(e)} />
            <div style={{marginTop: 32}}>
              <TextInput label='Last Name' error={this.state.lastname.error} defaultValue={this.state.lastname.value} onChange={(e) => this.onChange('lastname', e)} />
              <TextInput label='First Name' error={this.state.firstname.error} defaultValue={this.state.firstname.value} onChange={(e) => this.onChange('firstname', e)} />
            </div>
            <div style={{marginTop: 32}}>
              <TextInput label='Username (Displayed)' error={this.state.username.error} defaultValue={this.state.username.value} onChange={(e) => this.onChange('username', e)} />
            </div>
          </div>

          <div className='title-container'>
            <h1>Qwant Masq settings</h1>
            <h3>Edit app's behavior</h3>
          </div>

          <div className='app-settings'>
            <div style={{marginRight: 16}}>
              <CircleIndicator color='#458bf8' />
            </div>
            <p style={{marginRight: 16}}>Accept new applications automatically</p>
            <SwitchButton checked secondary color='#458bf8' />
          </div>

          <div className='app-settings'>
            <div style={{marginRight: 16}}>
              <CircleIndicator color='#458bf8' />
            </div>
            <p style={{marginRight: 16}}>Accept new applications automatically</p>
            <SwitchButton checked secondary color='#458bf8' />
          </div>

          <div className='app-settings'>
            <div style={{marginRight: 16}}>
              <CircleIndicator color='#458bf8' />
            </div>
            <p style={{marginRight: 16}}>Accept new applications automatically</p>
            <SwitchButton checked secondary color='#458bf8' />
          </div>
        </div>

        <div className='sidebar'>
          <Button label='SAVE' />
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
