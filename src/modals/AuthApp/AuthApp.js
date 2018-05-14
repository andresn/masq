import React from 'react'

import { Modal, Button } from 'components'

import './AuthApp.css'

const styles = {
  header: {
    // backgroundColor: '#252a39',
    height: 150,
    width: '100%'
  },
  title: {
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.1px',
    textAlign: 'center'
  },
  appTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.2px',
    textAlign: 'center'
  },
  description: {
    width: 380,
    paddingBottom: 32,
    fontSize: '14px',
    fontWeight: '500',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.57,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: 'var(--blue-200)'
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: 32
  }
}

export default class AuthApp extends React.Component {
  render () {
    return (
      <Modal onClose={this.props.onClose} height={670} width={511}>
        <div style={styles.header} />
        <div className='AuthApp'>
          <p style={styles.title}>New connection request from:</p>
          <p style={styles.appTitle}>{this.props.app.url}</p>
          <p style={styles.description}>
            This notification appears because that application asks permission
            to your Masq storage.
          </p>
          <p style={styles.description}>
            If you are not at the origin of this request or if you have question,
            please contact our help center.
          </p>

          <div style={styles.buttons}>
            <Button label='Reject' onClick={this.props.onReject} />
            <Button label='Accept' onClick={this.props.onAccept} />
          </div>
        </div>
      </Modal>
    )
  }
}
