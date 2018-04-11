import React from 'react'

import { Chevron } from 'icons'
import { Card, Separator } from 'components'

import './Applications.css'

class AppRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = { enabled: props.app.enabled }
    this.onChecked = this.onChecked.bind(this)
  }

  onChecked (state) {
    this.setState({ enabled: state })
    this.props.onChecked(state)
  }

  render () {
    const { app } = this.props
    const style = this.state.enabled ? { color: app.color } : {}
    return (
      <Card title={app.name} description={app.description} color={app.color} enabled={this.state.enabled} image={app.image} onChecked={this.onChecked}>
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
