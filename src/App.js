import React, { Component } from 'react'
import createHashHistory from 'history/createHashHistory'
import { Router, Redirect, Route, Switch } from 'react-router-dom'

import { Header, Tabs, Notification } from 'components'
import { Smartphone, Apps, Settings as SettingsIcon } from 'icons'
import { Devices, Applications, Settings, Login, Register, Loading, NewDevice } from 'pages'

import { UserContext } from 'context/user'

// FIXME: remove mocks data when lib is ready
import devicesMock from './mocks/devices'
import appsMock from './mocks/apps'

import { MasqStore } from './masq/store'

import './App.css'

const history = createHashHistory()
const store = new MasqStore()
store.init()

const tabs = [
  { label: 'Devices', link: '/devices', icon: <Smartphone /> },
  { label: 'Applications', link: '/applications', icon: <Apps /> },
  { label: 'Settings', link: '/settings', icon: <SettingsIcon /> }
]

function HeaderLoggedIn (props) {
  return (
    <Header
      title='Hello'
      shadow
      onLogout={props.onLogout}
      childrenHeight={props.notif ? 40 : 0}
    >
      {props.notif
        ? <Notification text='This is a Notification!' onClose={props.onCloseNotif} />
        : null
      }
    </Header>
  )
}

function HeaderLoggedOut (props) {
  return <Header onLogout={props.onLogout} />
}

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
      console.log(await store.listUsers())
      this.setState({ users: await store.listUsers() })
    } catch (e) { console.log(e) }
  }

  async fetchDevices () {
    let devices = await store.getDeviceList()
    // FIXME: use mock data for now
    if (!devices.length) {
      for (let dev of devicesMock) {
        await store.addDevice(dev)
      }
      devices = await store.getDeviceList()
    }
    this.devices = devices
  }

  async fetchApps () {
    let apps = await store.getApplicationList()
    // FIXME: use mock data for now
    if (!apps.length) {
      for (let app of appsMock) {
        await store.registerApp(app)
      }
      apps = await store.getApplicationList()
    }
    this.apps = apps
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
    await store.updateUser(user)
  }

  render () {
    return (
      <UserContext.Provider value={this.state.currentUser}>
        <Router history={history}>
          <div>
            {this.state.isAuthenticated && !this.state.isLogging
              ? <HeaderLoggedIn onLogout={this.signout} user={this.state.currentUser} notif={this.state.notif} onCloseNotif={this.onCloseNotif} />
              : <HeaderLoggedOut onLogout={this.signout} />
            }

            <Switch>
              <Route path='/register' component={
                () => <Register onRegister={this.onRegister} />
              } />
              <Route path='/loading' component={
                () => this.state.isLogging ? <Loading /> : <Redirect to='devices' />
              } />

              <Redirect exact from='/' to='/login' />
              <Route exact path='/login' component={() => (
                <Login auth={this.authenticate} users={this.state.users} />
              )} />
              {this.state.isLogging && <Redirect to='loading' />}
            </Switch>

            {this.state.isAuthenticated && !this.state.isLogging
              ? (
                <div style={{backgroundColor: 'var(--main-bg-color)', height: '100%'}}>
                  <Tabs tabs={tabs} />
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
