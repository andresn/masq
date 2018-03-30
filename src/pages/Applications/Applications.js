import React from 'react'

import { Chevron } from 'icons'
import { Card, Separator } from 'components'

import './Applications.css'

function AppRow (props) {
  const { app } = props
  const style = app.enabled ? { color: app.color } : {}
  return (
    <Card title={app.name} description={app.description} color={app.color} enabled={app.enabled} image={app.image} onChecked={props.onChecked}>
      <div className='permissions'>
        <p>5 PERMISSIONS</p>
        <div className='more'>
          <p style={style}>SEE MORE</p>
          <Chevron className='caret-icon' style={style} />
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
            <AppRow app={app} onChecked={() => props.onChecked(index)} />
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
        <AppRows applications={applications} active onChecked={props.onChecked} />
      </div>

      <h1 style={{marginLeft: '16px'}}>Currently connected to your Masq</h1>
      <div className='Applications'>
        <AppRows applications={applications} onChecked={props.onChecked} />
      </div>
    </div>
  )
}
