import localforage from 'localforage'
import React, { Component } from 'react'
import createHashHistory from 'history/createHashHistory'
import { Router, Route } from 'react-router-dom'

import { AuthApp } from 'modals'
import { Sidebar } from 'components'
import { UserContext } from 'context/user'
import {
  Login,
  Loading,
  Devices,
  Settings,
  Applications
} from 'pages'

import { Masq } from 'masq-store'
import { Server } from 'masq-socket'

import './App.css'

const history = createHashHistory()
const win = require('electron').remote.getCurrentWindow()

// Initialize masq store and server
const masq = new Masq({ storage: localforage })
const server = new Server(8080, masq, localforage)

class App extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      isLogging: false,
      isAuthenticated: false,
      notif: true,
      currentUser: null,
      appsRequests: []
    }

    this.signout = this.signout.bind(this)
    this.onRegister = this.onRegister.bind(this)
    this.onAppTrash = this.onAppTrash.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.onCloseNotif = this.onCloseNotif.bind(this)
    this.onDevChecked = this.onDevChecked.bind(this)
    this.onAppChecked = this.onAppChecked.bind(this)
    this.onDeleteUser = this.onDeleteUser.bind(this)
    this.onUpdateUser = this.onUpdateUser.bind(this)

    this.apps = []

    // FIXME
    this.devices = [
      { name: 'This device', color: '#40ae6c', enabled: true }
    ]
  }

  async authorizeApp (isAuthorized) {
    const appsRequests = this.state.appsRequests.slice()

    if (isAuthorized) {
      const app = appsRequests[0]
      app.enabled = true
      const token = await masq.addApp(app)
      await server.finishRegistration(token)
      if (!this.apps.find(a => app.url === a.url)) {
        this.apps.push(app)
      }
    }

    appsRequests.splice(0, 1)
    this.setState({
      appsRequests: appsRequests
    })
  }

  async componentDidMount () {
    await masq.init()
    await server.init()
    history.push('login')

    server.onRegister(async (appMeta) => {
      const appsRequests = this.state.appsRequests.slice()
      appsRequests.push(appMeta)
      const notif = new window.Notification('Masq App', {
        body: appMeta.url + ' is requesting access to Masq'
      })
      notif.onclick = () => win.focus()
      this.setState({
        appsRequests: appsRequests
      })
    })
    this.fetchUsers()
  }

  onCloseNotif () {
    this.setState({ notif: false })
  }

  async fetchUsers () {
    const users = Object.values(await masq.listUsers())
    this.setState({ users: users })
  }

  async fetchDevices () {
    // TODO: Use lib when it's ready
    this.devices = []
  }

  async fetchApps () {
    this.apps = Object.values(await masq.listApps())
  }

  async authenticate (indexUser) {
    const user = this.state.users[indexUser]
    await masq.signIn(user.username)
    this.setState({
      isAuthenticated: true,
      isLogging: true,
      currentUser: user
    })

    // simulate auth for 2 seconds
    // FIXME
    history.push('loading')
    setTimeout(() => {
      this.setState({ notif: true, isLogging: false })
      history.push('applications')
    }, 2000)

    // await this.fetchDevices()
    await this.fetchApps()
  }

  async signout () {
    await masq.signOut()
    this.setState({
      currentUser: null,
      isAuthenticated: false,
      isLogging: false
    })
    history.push('login')
  }

  async onDevChecked (index) {
    this.devices[index].enabled = !this.devices[index].enabled
    await masq.updateDevice(this.devices[index])
  }

  async onAppChecked (index) {
    this.apps[index].enabled = !this.apps[index].enabled
    await masq.updateApp(this.apps[index])
  }

  async onAppTrash (index) {
    const url = this.apps[index].url
    await masq.deleteApp(url)
    this.apps.splice(index, 1)
    this.forceUpdate()
  }

  async onRegister (user) {
    await masq.createUser(user)
    await this.fetchUsers()
    history.push('login')
  }

  async onDeleteUser () {
    await masq.deleteUser()
    await this.fetchUsers()
    history.push('login')
  }

  async onUpdateUser (user) {
    await masq.updateUser(user)
    await this.fetchUsers()
    this.setState({ currentUser: user })
  }

  render () {
    return (
      <UserContext.Provider value={this.state.currentUser}>
        <Router history={history}>
          <div className='App'>

            <Route path='/loading' component={Loading} />
            <Route
              path='/login'
              render={() =>
                <Login onAuth={this.authenticate} users={this.state.users} onSignup={this.onRegister} />
              }
            />

            {this.state.isAuthenticated && !this.state.isLogging
              ? (
                <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', height: '100%'}}>
                  <Sidebar onLogout={this.signout} />
                  <div style={{marginTop: 59, marginLeft: 40}} >
                    <Route path='/devices' render={() => <Devices devices={this.devices} onChecked={this.onDevChecked} onNewDevice={() => history.push('newdevice')} />} />
                    <Route path='/applications' render={() => <Applications applications={this.apps} onChecked={this.onAppChecked} onTrash={this.onAppTrash} />} />
                    <Route path='/settings' render={() => <Settings onDeleteUser={this.onDeleteUser} onUpdateUser={this.onUpdateUser} />} />
                    {this.state.appsRequests.length > 0 &&
                      <AuthApp
                        app={this.state.appsRequests[0]}
                        onAccept={() => this.authorizeApp(true)}
                        onReject={() => this.authorizeApp(false)}
                      />
                    }
                  </div>
                </div>)
              : null
            }
          </div>
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App
