import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Avatar } from 'components'
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
    paddingBottom: 64
  }
}

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpened: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.onSignup = this.onSignup.bind(this)
  }

  toggleModal (state) {
    this.setState({ isModalOpened: state })
  }

  onSignup (user) {
    this.toggleModal(false)
    this.props.onSignup(user)
  }

  render () {
    const { users, onAuth } = this.props
    // const style = !users.length ? { display: 'flex' } : {}
    return (
      <div className='Login'>
        {this.state.isModalOpened &&
          <Signup onClose={() => this.toggleModal(false)} onSignup={this.onSignup} />
        }
        <div className='header'>
          <Logo style={styles.logo} />
          <h1 className='title'>Who is it ?</h1>
        </div>

        <div className='users'>
          {users.map((user, index) =>
            <Link style={{textDecoration: 'none'}} key={index} to='devices' onClick={() => onAuth(index)}>
              <Avatar image={user.image} user={user} />
              <p>{user.username}</p>
            </Link>
          )}
          <div style={{textDecoration: 'none', cursor: 'pointer'}} onClick={() => this.toggleModal(true)}>
            <div style={{height: '120px'}}>
              <Plusbutton />
            </div>
            <p id='add-user'>Add user</p>
          </div>
        </div>
        <Background style={styles.background} />
      </div>
    )
  }
}

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}
