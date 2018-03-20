import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Devices from './pages/Devices'
import Applications from './pages/Applications'
import Settings from './pages/Settings'
import Login from './pages/Login'

import Header from './components/Header/Header'
import Tabs from './components/Tabs'
import Notification from './components/Notification/Notification'
// import SwitchButton from './components/SwitchButton';

import SmartphoneIcon from './icons/Smartphone'
import AppsIcon from './icons/Apps'
import SettingsIcon from './icons/Settings'

import './App.css'

const tabs = [
  { label: 'Devices', link: '/devices', icon: <SmartphoneIcon /> },
  { label: 'Applications', link: '/applications', icon: <AppsIcon /> },
  { label: 'Settings', link: '/settings', icon: <SettingsIcon /> }
]

class App extends Component {
  render () {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          {/* <SwitchButton/> */}
          <Header
            title='Hello'
            username='Geoffrey'
          >
            <Notification text='This is a Notification!' />
          </Header>

          <Tabs tabs={tabs} />

          {/* <li><Link to="/login">Login</Link></li> */}

          <Route path='/login' component={Login} />
          <Route path='/devices' component={Devices} />
          <Route path='/applications' component={Applications} />
          <Route path='/settings' component={Settings} />
        </div>
      </Router>
    )
  }
}

export default App
