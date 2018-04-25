import React from 'react'
import { withRouter } from 'react-router-dom'

import { Avatar } from 'components'
import { Background, Smartphone, Apps, Settings as SettingsIcon, Logout } from 'icons'

import './Sidebar.css'

const tabs = [
  { label: 'Devices', link: '/devices', icon: <Smartphone /> },
  { label: 'Applications', link: '/applications', icon: <Apps /> },
  { label: 'Settings', link: '/settings', icon: <SettingsIcon /> }
]

const styles = {
  Sidebar: {
    width: 252,
    height: '100%',
    backgroundColor: '#252a39'
  },
  flex: {
    paddingTop: 64,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  h2: {
    color: 'white',
    marginBottom: 0
  },
  logout: {
    color: 'white',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: 252,
    bottom: 64
  },
  background: {
    width: 252,
    position: 'absolute',
    bottom: 0
  },
  header: {
    height: 212,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center'
  },
  indicator: {
    width: 2,
    height: 21,
    borderRadius: 1,
    backgroundColor: '#458bf8'
  }
}

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

  onSelectTab (key) {
    const { history } = this.props
    history.push(tabs[key].link)
    this.setState({ currentTab: key })
  }

  render () {
    return (
      <div className='Sidebar' style={styles.Sidebar}>

        <div id='header' style={styles.header}>
          <Avatar image='https://randomuser.me/api/portraits/women/79.jpg' />
          <h2 style={styles.h2}>Ashley</h2>
          <p>Change user</p>
        </div>

        <div style={styles.tabs}>
          <div>
            {tabs.map((tab, index) => (
              <div className={'tab' + (index === this.state.currentTab ? ' active' : '')} key={index} onClick={() => this.onSelectTab(index)}>
                {/* <div style={styles.indicator} /> */}
                <div style={{margin: 'auto'}}>{ tab.icon }</div>
                <p>{tab.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.logout}>
          <div className='tab' onClick={this.props.onLogout}>
            <Logout color='white' />
            <p>LOGOUT</p>
          </div>
        </div>
        <Background style={styles.background} />
      </div>
    )
  }
}

export default withRouter(Sidebar)
