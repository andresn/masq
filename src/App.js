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

function HeaderLoggedIn (props) {
  return (
    <div>
      <Header
        title='Hello'
        username='Geoffrey'
        shadow
        onLogout={props.onLogout}
      >
        <Notification text='This is a Notification!' />
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
      <Route path='/settings' component={Settings} />
    </div>
  ) : null
}

class App extends Component {
  constructor () {
    super()
    this.state = { isAuthenticated: false }
    this.authenticate = this.authenticate.bind(this)
    this.signout = this.signout.bind(this)
  }

  authenticate () {
    this.setState({ isAuthenticated: true })
  }

  signout () {
    this.setState({ isAuthenticated: false })
  }

  render () {
    console.log('auth:', this.state.isAuthenticated)
    return (
      <Router>
        <div>
          {this.state.isAuthenticated
            ? <HeaderLoggedIn onLogout={this.signout} />
            : <HeaderLoggedOut onLogout={this.signout} />}

          <Route path='/register' component={Register} />
          <Route path='/login' component={() => (
            <Login auth={this.authenticate} />
          )} />

          <ProtectedPages isAuthenticated={this.state.isAuthenticated} />
        </div>
      </Router>
    )
  }
}

export default App
