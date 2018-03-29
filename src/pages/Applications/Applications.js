import React from 'react'

import Card from 'components/Card/Card'
import Separator from 'components/Separator'
import Chevron from 'icons/Chevron'

import './Applications.css'

function AppRow (props) {
  const { app } = props
  return (
    <Card title={app.name} description={app.description} color={app.color} enabled={app.enabled} image={app.image} onChecked={props.onChecked}>
      <div className='permissions'>
        <p>5 PERMISSIONS</p>
        <div className='more'>
          <p style={{ color: app.color }}>VOIR PLUS</p>
          <Chevron className='caret-icon' color={app.color} />
        </div>
      </div>
    </Card>
  )
}

function AppRows (props) {
  const { applications, active } = props
  return (
    applications.map((app, index) => (
      app.active === active
        ? (
          <div key={index} >
            <AppRow app={app} />
            <Separator />
          </div>
        )
        : null
    ))
  )
}

export default function Applications (props) {
  const { applications } = props

  return (
    <div style={{ backgroundColor: '#f5f7fa', paddingTop: '1px' }}>

      <h1 style={{marginLeft: '16px'}}>Currently active Applications</h1>
      <div className='Applications'>
        <AppRows applications={applications} active />
      </div>

      <h1 style={{marginLeft: '16px'}}>Currently connected to your Masq</h1>
      <div className='Applications'>
        <AppRows applications={applications} />
      </div>
    </div>
  )
}
