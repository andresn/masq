import React from 'react'
import PropTypes from 'prop-types'
import i18next from 'i18next'
import { Trans } from 'react-i18next'

import { Avatar, TextInput, Button } from 'components'

import { UserContext } from 'contexts/user'

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
    this.handleKeyUp = this.handleKeyUp.bind(this)
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
      this.hasChanged = true
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

  handleKeyUp (e) {
    if (e.key === 'Enter') {
      this.validate()
    }
  }

  render () {
    // const { onDeleteUser } = this.props

    return (
      <div className='Settings'>
        <div>
          <div className='title-container'>
            <h1><Trans>Your profile</Trans></h1>
            <h3><Trans>Edit your personal informations</Trans></h3>
          </div>

          <div className='profile'>
            <Avatar upload image={this.state.image} onChange={(e) => this.onImageChange(e)} />
            <div className='inputs'>
              <TextInput
                label={i18next.t('Last Name')}
                error={!this.isValid('lastname')}
                onKeyUp={this.handleKeyUp}
                defaultValue={this.state.lastname} onChange={(e) => this.onChange('lastname', e)}
              />
              <TextInput
                label={i18next.t('First Name')}
                error={!this.isValid('firstname')}
                onKeyUp={this.handleKeyUp}
                defaultValue={this.state.firstname} onChange={(e) => this.onChange('firstname', e)}
              />
              <TextInput
                label={i18next.t('Username (displayed)')}
                error={!this.isValid('username')}
                onKeyUp={this.handleKeyUp}
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
          <Button width={200} secondary={!this.hasChanged} label={i18next.t('SAVE')} onClick={this.validate} />
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
