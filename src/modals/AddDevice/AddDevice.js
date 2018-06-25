import React from 'react'
import { Trans } from 'react-i18next'

import { Modal, Button, QRCode } from 'components'

import './AddDevice.css'

export default class Signup extends React.Component {
  render () {
    return (
      <Modal height={547} width={417} onClose={this.props.onClose}>
        <div className='AddDevice'>
          <h1><Trans>Add a new device</Trans></h1>
          <QRCode image='http://www.datafakegenerator.com/temp/test409236e0431d1d4dcf66ffba56d9d43c.png' />
          <a href='https://QWA.NT/0BJ8ZX'>QWA.NT/0BJ8ZX</a>
          <p style={{paddingBottom: 64}}><Trans>Scan your QR Code on the devices that you want to sync with.</Trans></p>
          <p><Trans>You do not know how to do this ?</Trans></p>
          <Button secondary label='ADD A DEVICE' />
        </div>
      </Modal>
    )
  }
}
