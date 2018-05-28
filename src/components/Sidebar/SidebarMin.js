import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'components'
import { Logout } from 'icons'

import './Sidebar.css'

const styles = {
  Sidebar: {
    position: 'relative',
    width: 100,
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
    // width: 252,
    width: '100%',
    alignItems: 'center',
    bottom: 64
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
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  indicator: {
    width: 2,
    height: 21,
    borderRadius: 1,
    backgroundColor: '#458bf8',
    position: 'absolute',
    marginTop: 4,
    marginRight: 8
  },
  tab: {
    marginTop: 32,
    alignItems: 'center',
    cursor: 'pointer'
  }
}

export default function SidebarMin (props) {
  const { user, currentTab, onLogout, onSelectTab, tabs } = props
  return (
    <div className='Sidebar' style={styles.Sidebar}>
      <div id='header' style={styles.header}>
        <Avatar image={user.image} user={user} />
      </div>

      <div style={styles.tabs}>
        {tabs.map((tab, index) => (
          <div key={index} onClick={() => onSelectTab(index)}>
            <div style={styles.tab} className={'tab' + (index === currentTab ? ' active' : '')}>
              <div style={{margin: 'auto'}}>{ tab.icon }</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.logout}>
        <div style={styles.tab} className='tab' onClick={onLogout}>
          <Logout />
        </div>
      </div>
    </div>
  )
}

SidebarMin.propTypes = {
  user: PropTypes.object,
  currentTab: PropTypes.number,
  onLogout: PropTypes.func,
  onSelectTab: PropTypes.func,
  tabs: PropTypes.array
}
