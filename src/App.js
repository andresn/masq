import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Devices from './pages/Devices'
import Applications from './pages/Applications'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'

import Header from './components/Header/Header'
import Tabs from './components/Tabs/Tabs'
import Notification from './components/Notification/Notification'

import SmartphoneIcon from './icons/Smartphone'
import AppsIcon from './icons/Apps'
import SettingsIcon from './icons/Settings'

import './App.css'

const tabs = [
  { label: 'Devices', link: '/devices', icon: <SmartphoneIcon /> },
  { label: 'Applications', link: '/applications', icon: <AppsIcon /> },
  { label: 'Settings', link: '/settings', icon: <SettingsIcon /> }
]

const isLoggedIn = false

function AppLogged () {
  return (
    <div>
      <Header
        title='Hello'
        username='Geoffrey'
        shadow
      >
        <Notification text='This is a Notification!' />
      </Header>

      <Tabs tabs={tabs} />

      <Route path='/login' component={Login} />
      <div>
        <Route path='/devices' component={Devices} />
        <Route path='/applications' component={Applications} />
        <Route path='/settings' component={Settings} />
      </div>
    </div>
  )
}

function AppLoggedOut () {
  return (
    <div>
      <Header />
      {/* <Login /> */}
      <Register />
    </div>
  )
}

class App extends Component {
  render () {
    return (
      <Router>
        {isLoggedIn ? <AppLogged /> : <AppLoggedOut />}
      </Router>
    )
  }
}

export default App
