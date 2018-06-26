import React from 'react'
import i18next from 'i18next'
import { Trans } from 'react-i18next'

import { Modal, Button } from 'components'

import './AuthApp.css'

const styles = {
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
    const { onClose, app, securityCode = 1234, onAccept, onReject } = this.props
    return (
      <Modal onClose={onClose} width={511}>
        <div className='AuthApp'>
          <p style={styles.title}><Trans>New connection request from</Trans></p>
          <p style={styles.appTitle}>{app.url}</p>
          <input className='securityCode' placeholder={securityCode} readOnly />
          <p style={styles.description}>
            <Trans>This notification appears because that application asks permission
            to use your Masq storage.</Trans>
          </p>
          <p style={styles.description}>
            <Trans>If you are not at the origin of this request or if you have question,
            please contact our help center.</Trans>
          </p>

          <div style={styles.buttons}>
            <Button label={i18next.t('Reject')} onClick={onReject} />
            <Button label={i18next.t('Accept')} onClick={onAccept} />
          </div>
        </div>
      </Modal>
    )
  }
}
