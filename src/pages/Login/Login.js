import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import i18next from 'i18next'

import { Avatar, TextInput } from 'components'
import { Background, Logo, Plusbutton, Chevron } from 'icons'
import { Signup } from 'modals'

import './Login.css'

const styles = {
  background: {
    bottom: 0,
    maxHeight: 252,
    position: 'absolute',
    zIndex: -1
  },
  logo: {
    marginTop: 32,
    paddingBottom: 64
  }
}

export function UsersSelection (props) {
  const { users, selectUser, isModalOpened, onSignup, toggleModal } = props
  return (
    <div className='Login'>
      {isModalOpened &&
        <Signup onClose={() => toggleModal(false)} onSignup={onSignup} />
      }
      <div className='header'>
        <Logo style={styles.logo} />
        <h1 className='title'><Trans>Who is it ?</Trans></h1>
      </div>

      <div className='users'>
        {users.map((user, index) =>
          <div style={{textDecoration: 'none'}} key={index} onClick={() => selectUser(user)}>
            <div style={{cursor: 'pointer'}}>
              <Avatar image={user.image} user={user} />
            </div>
            <p className='username'>{user.username}</p>
          </div>
        )}
        <div style={{textDecoration: 'none'}} onClick={() => toggleModal(true)}>
          <div style={{height: '120px', cursor: 'pointer'}}>
            <Plusbutton />
          </div>
          <p className='username' id='add-user'><Trans>Add a user</Trans></p>
        </div>
      </div>
      <Background style={styles.background} />
    </div>
  )
}

export class UserPassword extends React.Component {
  constructor (props) {
    super(props)
    this.password = ''
    this.state = {
      user: props.user,
      isWrongPassword: false
    }
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  onChange (e) {
    this.password = e.target.value
  }

  async onKeyUp (e) {
    const { onAuth } = this.props
    if (e.key === 'Enter') {
      try {
        await onAuth({
          ...this.state.user,
          password: this.password
        })
      } catch (err) {
        this.setState({
          isWrongPassword: true
        })
      }
    }
  }

  render () {
    const { user, clearUser } = this.props

    return (
      <div className='Login'>
        <div className='header'>
          <Logo style={styles.logo} />
        </div>

        <div className='goback'>
          <Chevron style={{transform: 'rotate(90deg)', cursor: 'pointer'}} onClick={clearUser} />
          <p onClick={clearUser}><Trans i18nKey='Change user' /></p>
        </div>

        <div className='users'>
          <div style={{textDecoration: 'none'}}>
            <Avatar image={user.image} user={user} />
            <p className='username'>{user.username}</p>
          </div>
        </div>
        <div className='text'>
          <p><Trans i18nKey='Enter your password' /></p>
          <TextInput
            password
            focus
            onChange={this.onChange}
            error={this.state.isWrongPassword}
            labelError={i18next.t('Wrong password, please try again')}
            onKeyUp={this.onKeyUp}
          />
        </div>
        <Background style={styles.background} />
      </div>
    )
  }
}

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpened: false,
      user: null
    }
    this.onSignup = this.onSignup.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal (state) {
    this.setState({ isModalOpened: state })
  }

  onSignup (user) {
    this.toggleModal(false)
    this.props.onSignup(user)
  }

  selectUser (user) {
    this.setState({
      user: user
    })
  }

  render () {
    const { onAuth } = this.props
    return !this.state.user
      ? (
        <UsersSelection
          {...this.props}
          onSignup={this.onSignup}
          selectUser={this.selectUser}
          toggleModal={this.toggleModal}
          isModalOpened={this.state.isModalOpened}
        />
      )
      : (
        <UserPassword
          onAuth={onAuth}
          user={this.state.user}
          clearUser={() => this.setState({user: null})}
        />
      )
  }
}

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}
