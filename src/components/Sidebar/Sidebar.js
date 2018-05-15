import React from 'react'
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import { Smartphone, Cards, Settings as SettingsIcon } from 'icons'

import { UserContext } from 'context/user'

import SidebarMin from './SidebarMin'
import SidebarMax from './SidebarMax'

import './Sidebar.css'

const tabs = [
  { label: 'Applications', link: '/applications', icon: <Cards /> },
  { label: 'Devices', link: '/devices', icon: <Smartphone /> },
  { label: 'Settings', link: '/settings', icon: <SettingsIcon /> }
]

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0
    }
    this.onSelectTab = this.onSelectTab.bind(this)
  }

  onSelectTab (key) {
    const { history } = this.props
    history.push(tabs[key].link)
    this.setState({ currentTab: key })
  }

  render () {
    const { user, onLogout } = this.props

    return (
      <div>
        <MediaQuery maxWidth={800}>
          <SidebarMin user={user} currentTab={this.state.currentTab} onLogout={onLogout} onSelectTab={this.onSelectTab} tabs={tabs} />
        </MediaQuery>
        <MediaQuery minWidth={801}>
          <SidebarMax user={user} currentTab={this.state.currentTab} onLogout={onLogout} onSelectTab={this.onSelectTab} tabs={tabs} />
        </MediaQuery>
      </div>
    )
  }
}

export default withRouter((props) =>
  <UserContext.Consumer>
    {user => <Sidebar {...props} user={user} />}
  </UserContext.Consumer>
)
