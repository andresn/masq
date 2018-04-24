import React, { Component } from 'react'
import createHashHistory from 'history/createHashHistory'
import { Router, Redirect, Route, Switch } from 'react-router-dom'

// import { Tabs } from 'components'
// import { Smartphone, Apps, Settings as SettingsIcon } from 'icons'
import { Devices, Applications, Settings, Login, Register, Loading, NewDevice } from 'pages'
// import { Signup } from 'modals'

import { UserContext } from 'context/user'

// FIXME: remove mocks data when lib is ready
import devicesMock from './mocks/devices'
import appsMock from './mocks/apps'

import * as lib from './lib/'

import './App.css'

const history = createHashHistory()

// const tabs = [
//   { label: 'Devices', link: '/devices', icon: <Smartphone /> },
//   { label: 'Applications', link: '/applications', icon: <Apps /> },
//   { label: 'Settings', link: '/settings', icon: <SettingsIcon /> }
// ]

class App extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      isLogging: false,
      isAuthenticated: false,
      notif: true,
      currentUser: null
    }

    this.signout = this.signout.bind(this)
    this.onRegister = this.onRegister.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.onCloseNotif = this.onCloseNotif.bind(this)
    this.onDevChecked = this.onDevChecked.bind(this)
    this.onAppChecked = this.onAppChecked.bind(this)
    this.onDeleteUser = this.onDeleteUser.bind(this)

    this.apps = []
    this.devices = []
  }

  componentDidMount () {
    this.fetchUsers()
  }

  onCloseNotif () {
    this.setState({ notif: false })
  }

  async fetchUsers () {
    try {
      this.setState({ users: await lib.getUserList() })
    } catch (e) { console.log(e) }
  }

  async fetchDevices () {
    let devices = await lib.getDeviceList()
    // FIXME: use mock data for now
    if (!devices.length) {
      for (let dev of devicesMock) {
        await lib.addDevice(dev)
      }
      devices = await lib.getDeviceList()
    }
    this.devices = devices
  }

  async fetchApps () {
    let apps = await lib.getApplicationList()
    // FIXME: use mock data for now
    if (!apps.length) {
      for (let app of appsMock) {
        await lib.registerApp(app)
      }
      apps = await lib.getApplicationList()
    }
    this.apps = apps
  }

  async authenticate (indexUser) {
    await lib.signIn(this.state.users[indexUser].username)
    this.setState({
      isAuthenticated: true,
      isLogging: true,
      currentUser: this.state.users[indexUser]
    })

    // simulate auth
    setTimeout(() => {
      this.setState({ notif: true, isLogging: false })
    }, 2000)

    await this.fetchDevices()
    await this.fetchApps()
  }

  signout () {
    this.setState({
      currentUser: null,
      isAuthenticated: false,
      isLogging: false
    })
  }

  async onDevChecked (index) {
    this.devices[index].enabled = !this.devices[index].enabled
    await lib.updateDevice(this.devices[index])
  }

  async onAppChecked (index) {
    this.apps[index].enabled = !this.apps[index].enabled
    await lib.updateApp(this.apps[index])
  }

  async onRegister (user) {
    await lib.createUser(user)
    await this.fetchUsers()
    history.push('login')
  }

  async onDeleteUser () {
    await lib.deleteUser()
    this.fetchUsers()
  }

  async onUpdateUser (user) {
    await lib.updateUser(user)
  }

  render () {
    return (
      <UserContext.Provider value={this.state.currentUser}>
        <Router history={history}>
          <div style={{height: '100%'}}>
            {/* <Signup /> */}
            <Switch>
              <Route path='/register' component={
                () => <Register onRegister={this.onRegister} />
              } />
              <Route path='/loading' component={
                () => this.state.isLogging ? <Loading /> : <Redirect to='devices' />
              } />

              <Redirect exact from='/' to='/login' />
              <Route exact path='/login' component={() => (
                <Login onAuth={this.authenticate} users={this.state.users} />
              )} />
              {this.state.isLogging && <Redirect to='loading' />}
            </Switch>

            {this.state.isAuthenticated && !this.state.isLogging
              ? (
                <div style={{backgroundColor: 'var(--main-bg-color)', height: '100%'}}>
                  <Route path='/devices' component={() => <Devices devices={this.devices} onChecked={this.onDevChecked} onNewDevice={() => history.push('newdevice')} />} />
                  <Route path='/applications' component={() => <Applications applications={this.apps} onChecked={this.onAppChecked} />} />
                  <Route path='/settings' component={() => <Settings onDeleteUser={this.onDeleteUser} onUpdateUser={this.onUpdateUser} />} />
                </div>)
              : null
            }
            {this.state.isAuthenticated && <Route path='/newdevice' component={() =>
              <NewDevice image='http://www.datafakegenerator.com/temp/test409236e0431d1d4dcf66ffba56d9d43c.png' link='QWA.NT/0BJ8ZX' />}
            /> }
          </div>
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App
