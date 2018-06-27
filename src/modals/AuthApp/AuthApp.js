import React from 'react'
import i18next from 'i18next'
import { Trans } from 'react-i18next'

import { Modal, Button } from 'components'

import './AuthApp.css'

export default class AuthApp extends React.Component {
  render () {
    const { onClose, app, securityCode = 1234, onAccept, onReject } = this.props
    return (
      <Modal onClose={onClose} width={511}>
        <div className='AuthApp'>
          <p className='title'><Trans>New connection request from</Trans></p>
          <p className='appTitle'>{app.url}</p>
          <input className='securityCode' placeholder={securityCode} readOnly />
          <p className='description'>
            <Trans>This notification appears because that application asks permission
            to use your Masq storage.</Trans>
          </p>
          <p className='description'>
            <Trans>If you are not at the origin of this request or if you have question,
            please contact our help center.</Trans>
          </p>

          <div className='buttons'>
            <Button label={i18next.t('Reject')} onClick={onReject} />
            <Button label={i18next.t('Accept')} onClick={onAccept} />
          </div>
        </div>
      </Modal>
    )
  }
}
