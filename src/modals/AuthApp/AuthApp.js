import React from 'react'

import { Modal, Button } from 'components'

import './AuthApp.css'

export default class AuthApp extends React.Component {
  render () {
    return (
      <Modal onClose={this.props.onClose}>
        <div className='AuthApp'>
          <h1>New App request</h1>
          <p style={{paddingBottom: 64}}>The app {this.props.app.url} is requesting access to your masq</p>
          <div>
            <Button label='Reject' onClick={this.props.onReject} />
            <Button label='Accept' onClick={this.props.onAccept} />
          </div>
        </div>
      </Modal>
    )
  }
}
