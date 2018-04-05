import React from 'react'

import { Chevron } from 'icons'
import { Card, Separator } from 'components'

import './Applications.css'

function AppRow (props) {
  const { app, onChecked } = props
  const style = app.enabled ? { color: app.color } : {}
  return (
    <Card title={app.name} description={app.description} color={app.color} enabled={app.enabled} image={app.image} onChecked={onChecked}>
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
  const { applications, onChecked } = props

  return (
    <div>
      <h2 style={{marginLeft: '16px'}}>Currently active Applications</h2>
      <div className='Applications'>
        <AppRows applications={applications} active onChecked={onChecked} />
      </div>

      <h2 style={{marginLeft: '16px'}}>Currently connected to your Masq</h2>
      <div className='Applications'>
        <AppRows applications={applications} onChecked={onChecked} />
      </div>
    </div>
  )
}
