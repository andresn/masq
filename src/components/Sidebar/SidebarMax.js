import React from 'react'

import { Avatar } from 'components'
import { Background, Logout } from 'icons'

import './Sidebar.css'

const styles = {
  Sidebar: {
    position: 'relative',
    width: 252,
    height: '100%',
    backgroundColor: '#252a39'
  },
  user: {
    fontSize: 14
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
    backgroundColor: '#458bf8',
    position: 'absolute',
    marginTop: 4,
    marginRight: 8
  },
  tab: {
    marginTop: 32,
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '40% 60%',
    cursor: 'pointer'
  }
}

export default function SidebarMin (props) {
  const { user, currentTab, onLogout, onSelectTab, tabs } = props
  console.log('currentTab', currentTab)
  return (
    <div className='Sidebar' style={styles.Sidebar}>
      <div id='header' style={styles.header}>
        <Avatar image={user.image} user={user} />
        <h2 style={styles.h2}>{user.username}</h2>
        <p style={styles.user}>{user.firstname} {user.lastname} </p>
      </div>

      <div style={styles.tabs}>
        <div style={{width: 170}}>
          {tabs.map((tab, index) => (
            <div key={index} onClick={() => onSelectTab(index)}>
              {(index === currentTab) && <div style={styles.indicator} />}
              <div style={styles.tab} className={'tab' + (index === currentTab ? ' active' : '')}>
                <div style={{margin: 'auto'}}>{ tab.icon }</div>
                <p>{tab.label.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.logout}>
        <div style={styles.tab} onClick={onLogout}>
          <Logout color='white' />
          <p>LOGOUT</p>
        </div>
      </div>
      <Background style={styles.background} />
    </div>
  )
}
