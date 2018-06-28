import React from 'react'
import i18next from 'i18next'
import { Trans } from 'react-i18next'

import { Modal, Button } from 'components'

import './AuthApp.css'

export default class AuthApp extends React.Component {
  render () {
    const { onClose, app, onAccept, onReject } = this.props
    const securityCode = app.securityCode || '----'

    return (
      <Modal onClose={onClose} width={511}>
        <div className='AuthApp'>
          <p className='title'><Trans>New connection request from</Trans></p>
          <p className='appTitle'>{app.url}</p>
          <p className='description securityText'>
            <Trans>Security Code</Trans> :
          </p>
          <input className='securityCode' placeholder={securityCode} readOnly />
          <p className='description'>
            <Trans>This notification appears because that application asks permission
            to use your Masq storage. Please verify that the security code match with the one of the app.</Trans>
          </p>
          <p className='description'>
            <Trans>If you are not at the origin of this request or if you have question,
            please contact our help center.</Trans>
          </p>

          <div className='buttons'>
            <Button label={i18next.t('Reject')} onClick={onReject} color={'var(--red-100)'} colorShadow={'var(--red-100-shadow)'} />
            <Button label={i18next.t('Accept')} onClick={onAccept} color={'var(--green-100)'} colorShadow={'var(--green-100-shadow)'} />
          </div>
        </div>
      </Modal>
    )
  }
}
