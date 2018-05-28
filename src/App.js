import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import localforage from 'localforage'
import { remote } from 'electron'

import { Server } from 'masq-socket'
import { Masq } from 'masq-store'

import { Login, Loading, Devices, Settings, Applications } from 'pages'
import { UserContext } from 'contexts/user'
import { Sidebar } from 'components'
import { AuthApp } from 'modals'

import './App.css'

const win = remote.getCurrentWindow()
const history = createBrowserHistory()
// Initialize masq store and server
const masq = new Masq({ storage: localforage })
const server = new Server(8080, masq, localforage)

class App extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      isAuthenticated: false,
      currentUser: null,
      appsRequests: []
    }

    this.signin = this.signin.bind(this)
    this.signout = this.signout.bind(this)
    this.onSignup = this.onSignup.bind(this)
    this.onAppTrash = this.onAppTrash.bind(this)
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
      this.fetchApps()
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
      if (!this.state.currentUser) {
        win.focus()
      }

      if (this.apps.find(a => appMeta.url === a.url)) {
        return
      }

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
    this.forceUpdate()
  }

  async signin (user) {
    history.push('loading')
    await masq.signIn(user.username)
    this.setState({
      isAuthenticated: true,
      currentUser: user
    })
    history.push('applications')
    // await this.fetchDevices()
    await this.fetchApps()
  }

  async signout () {
    await masq.signOut()
    this.setState({
      currentUser: null,
      isAuthenticated: false
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

  async onSignup (user) {
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
                <Login onAuth={this.signin} users={this.state.users} onSignup={this.onSignup} />
              }
            />

            {this.state.isAuthenticated
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
