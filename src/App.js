import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
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

const devices = [
  { name: 'TV de Margaux', color: '#86e991', enabled: true, new: true },
  { name: 'iPhone de Margaux', color: '#86e991', enabled: true },
  { name: 'iPad de Margaux', color: '#86e991', enabled: false },
  { name: 'Oneplus de Matthieu', color: '#ee6e7e', enabled: true }
]

const applications = [
  {
    name: 'Qwant Music',
    color: '#5c00f3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    enabled: true,
    image: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    active: true
  },
  {
    name: 'Qwant Maps',
    color: '#a3005c',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    enabled: false,
    image: 'https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
  },
  {
    name: 'Qwant Shopping',
    color: '#01cbd9',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    enabled: true
  },
  {
    name: 'Qwant Shopping',
    color: '#01cbd9',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    enabled: true
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
        childrenHeight={props.notif ? 40 : 0}
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

class App extends Component {
  constructor () {
    super()
    this.state = {
      isAuthenticated: false,
      notif: true,
      devices: devices.slice(),
      applications: applications.slice()
    }
    this.authenticate = this.authenticate.bind(this)
    this.onCloseNotif = this.onCloseNotif.bind(this)
    this.signout = this.signout.bind(this)
    this.onChecked = this.onChecked.bind(this)
    this.onAppChecked = this.onAppChecked.bind(this)
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

  onChecked (index) {
    const devices = this.state.devices.map((dev, i) => {
      if (index === i) dev.enabled = !dev.enabled
      return dev
    })

    this.setState({ devices })
  }

  onAppChecked (index) {
    const applications = this.state.applications.map((app, i) => {
      if (index === i) app.enabled = !app.enabled
      return app
    })

    this.setState({ applications })
  }

  render () {
    console.log('auth:', this.state.isAuthenticated, this.state.currentUser)
    return (
      <Router>
        <div>
          {this.state.isAuthenticated
            ? <HeaderLoggedIn onLogout={this.signout} user={this.state.currentUser} notif={this.state.notif} onCloseNotif={this.onCloseNotif} />
            : <HeaderLoggedOut onLogout={this.signout} />
          }

          <Route path='/register' component={Register} />

          <Switch>
            <Redirect exact from='/' to='/login' />
            <Route exact path='/login' component={() => (
              <Login auth={this.authenticate} users={users} />
            )} />
          </Switch>

          {this.state.isAuthenticated
            ? (
              <div>
                <Route path='/devices' component={() => <Devices devices={devices} onChecked={this.onChecked} />} />
                <Route path='/applications' component={() => <Applications applications={applications} onChecked={this.onAppChecked} />} />
                <Route path='/settings' component={() => <Settings user={this.state.currentUser} />} />
              </div>)
            : null
          }
        </div>
      </Router>
    )
  }
}

export default App
