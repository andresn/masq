import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, TextInput } from 'components'
import { Background, Logo, Plusbutton } from 'icons'
import { Signup } from 'modals'

import './Login.css'

const styles = {
  background: {
    bottom: 0,
    maxHeight: 252,
    position: 'absolute'
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
        <h1 className='title'>Who is it ?</h1>
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
          <p className='username' id='add-user'>Add user</p>
        </div>
      </div>
      <Background style={styles.background} />
    </div>
  )
}

export function UserPassword (props) {
  const { user, onAuth } = props
  let password = ''

  function onChange (e) {
    password = e.target.value
  }

  function onKeyUp (e) {
    if (e.key === 'Enter') {
      user.password = password
      onAuth(user)
    }
  }

  return (
    <div className='Login'>
      <div className='header'>
        <Logo style={styles.logo} />
      </div>

      <div className='users'>
        <div style={{textDecoration: 'none'}}>
          <Avatar image={user.image} user={user} />
          <p className='username'>{user.username}</p>
        </div>
      </div>
      <div className='password'>
        <p>Enter your password</p>
        <TextInput password onChange={onChange} onKeyUp={onKeyUp} />
      </div>
      <Background style={styles.background} />
    </div>
  )
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
        />
      )
  }
}

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}
