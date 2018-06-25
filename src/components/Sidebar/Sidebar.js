import React from 'react'
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import i18next from 'i18next'

import { Smartphone, Cards, Settings as SettingsIcon } from 'icons'

import { UserContext } from 'contexts/user'

import SidebarMin from './SidebarMin'
import SidebarMax from './SidebarMax'

import './Sidebar.css'

const tabs = [
  { label: i18next.t('Applications'), link: '/applications', icon: <Cards /> },
  { label: i18next.t('Devices'), link: '/devices', icon: <Smartphone /> },
  { label: i18next.t('Settings'), link: '/settings', icon: <SettingsIcon /> }
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
      <div style={{height: '100%'}}>
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

Sidebar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
}

export default withRouter((props) =>
  <UserContext.Consumer>
    {user => <Sidebar {...props} user={user} />}
  </UserContext.Consumer>
)
