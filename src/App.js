import React, { Component } from 'react'
import createHashHistory from 'history/createHashHistory'
import { Router, Redirect, Route, Switch } from 'react-router-dom'

import localforage from 'localforage'

import { Sidebar } from 'components'
// import { Smartphone, Apps, Settings as SettingsIcon } from 'icons'
import { Devices, Applications, Settings, Login, Register, Loading, NewDevice } from 'pages'
// import { Signup } from 'modals'

import { UserContext } from 'context/user'

// FIXME: remove mocks data when lib is ready
// import devicesMock from './mocks/devices'
// import appsMock from './mocks/apps'

import { MasqStore } from './masq/store'

import './App.css'

const history = createHashHistory()

const store = new MasqStore({ storage: localforage })

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
    this.onUpdateUser = this.onUpdateUser.bind(this)

    this.apps = []
    this.devices = []
  }

  async componentDidMount () {
    await store.init()
    this.fetchUsers()
  }

  onCloseNotif () {
    this.setState({ notif: false })
  }

  async fetchUsers () {
    const users = Object.values(await store.listUsers())
    try {
      this.setState({ users: users })
    } catch (e) { console.log(e) }
  }

  async fetchDevices () {
    // TODO: Use lib when it's ready
    this.devices = []
  }

  async fetchApps () {
    this.apps = Object.values(await store.listApps())
  }

  async authenticate (indexUser) {
    await store.signIn(this.state.users[indexUser].username)
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
    history.push('/')
  }

  async onDevChecked (index) {
    this.devices[index].enabled = !this.devices[index].enabled
    await store.updateDevice(this.devices[index])
  }

  async onAppChecked (index) {
    this.apps[index].enabled = !this.apps[index].enabled
    await store.updateApp(this.apps[index])
  }

  async onRegister (user) {
    await store.createUser(user)
    await this.fetchUsers()
    history.push('login')
  }

  async onDeleteUser () {
    await store.deleteUser()
    this.fetchUsers()
  }

  async onUpdateUser (user) {
    try {
      await store.updateUser(user)
      await this.fetchUsers()
      this.setState({ currentUser: user })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    return (
      <UserContext.Provider value={this.state.currentUser}>
        <Router history={history}>
          <div className='App'>
            <Switch>
              <Route path='/register' component={
                () => <Register onRegister={this.onRegister} />
              } />
              <Route path='/loading' component={
                () => this.state.isLogging ? <Loading /> : <Redirect to='devices' />
              } />

              <Redirect exact from='/' to='/login' />
              <Route exact path='/login' component={() => (
                <Login onAuth={this.authenticate} users={this.state.users} onSignup={this.onRegister} />
              )} />
              {this.state.isLogging && <Redirect to='loading' />}
            </Switch>

            {this.state.isAuthenticated && !this.state.isLogging
              ? (
                <div style={{display: 'grid', gridTemplateColumns: '252px auto', height: '100%'}}>
                  <Sidebar onLogout={this.signout} />
                  <div style={{marginTop: 59, marginLeft: 40}} >
                    <Route path='/devices' component={() => <Devices devices={this.devices} onChecked={this.onDevChecked} onNewDevice={() => history.push('newdevice')} />} />
                    <Route path='/applications' component={() => <Applications applications={this.apps} onChecked={this.onAppChecked} />} />
                    <Route path='/settings' component={() => <Settings onDeleteUser={this.onDeleteUser} onUpdateUser={this.onUpdateUser} />} />
                  </div>
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
