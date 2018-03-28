import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Devices from 'pages/Devices/Devices'
import Applications from 'pages/Applications/Applications'
import Settings from 'pages/Settings/Settings'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'

import Header from 'components/Header/Header'
import Tabs from 'components/Tabs/Tabs'
import Notification from 'components/Notification/Notification'

import SmartphoneIcon from 'icons/Smartphone'
import AppsIcon from 'icons/Apps'
import SettingsIcon from 'icons/Settings'

import './App.css'

const tabs = [
  { label: 'Devices', link: '/devices', icon: <SmartphoneIcon /> },
  { label: 'Applications', link: '/applications', icon: <AppsIcon /> },
  { label: 'Settings', link: '/settings', icon: <SettingsIcon /> }
]

const users = [
  {
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    firstname: 'Alicia',
    lastname: 'Ford',
    username: 'Mustang'
  },
  {
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    firstname: 'Jeffrey',
    lastname: 'Hoffman',
    username: 'Jeff'
  },
  {
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
    firstname: 'Ida',
    lastname: 'Meyer',
    username: 'Idada'
  }
]

function HeaderLoggedIn (props) {
  return (
    <div>
      <Header
        title='Hello'
        user={props.user}
        shadow
        onLogout={props.onLogout}
      >
        {props.notif
          ? <Notification text='This is a Notification!' onClose={props.onCloseNotif} />
          : null
        }
      </Header>

      <Tabs tabs={tabs} />
    </div>
  )
}

function HeaderLoggedOut (props) {
  return <Header onLogout={props.onLogout} />
}

function ProtectedPages (props) {
  return props.isAuthenticated ? (
    <div>
      <Route path='/devices' component={Devices} />
      <Route path='/applications' component={Applications} />
      <Route path='/settings' component={() => <Settings user={props.user} />} />
    </div>
  ) : null
}

class App extends Component {
  constructor () {
    super()
    this.state = { isAuthenticated: false, notif: true }
    this.authenticate = this.authenticate.bind(this)
    this.onCloseNotif = this.onCloseNotif.bind(this)
    this.signout = this.signout.bind(this)
  }

  onCloseNotif () {
    this.setState({ notif: false })
  }

  authenticate (indexUser) {
    this.setState({
      notif: true,
      isAuthenticated: true,
      currentUser: users[indexUser]
    })
  }

  signout () {
    this.setState({
      currentUser: null,
      isAuthenticated: false
    })
  }

  render () {
    console.log('auth:', this.state.isAuthenticated, this.state.currentUser)
    return (
      <Router>
        <div>
          {this.state.isAuthenticated
            ? <HeaderLoggedIn onLogout={this.signout} user={this.state.currentUser} notif={this.state.notif} onCloseNotif={this.onCloseNotif} />
            : <HeaderLoggedOut onLogout={this.signout} />}

          <Route path='/register' component={Register} />
          <Route path='/login' component={() => (
            <Login auth={this.authenticate} users={users} />
          )} />

          <ProtectedPages isAuthenticated={this.state.isAuthenticated} user={this.state.currentUser} />
        </div>
      </Router>
    )
  }
}

export default App
