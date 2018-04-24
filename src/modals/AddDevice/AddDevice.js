import React from 'react'

import { Modal, Button, QRCode } from 'components'

import './AddDevice.css'

export default class Signup extends React.Component {
  render () {
    return (
      <Modal onClose={this.props.onClose}>
        <div className='AddDevice'>
          <h1>Add a new device</h1>
          <QRCode image='http://www.datafakegenerator.com/temp/test409236e0431d1d4dcf66ffba56d9d43c.png' />
          <a href='https://QWA.NT/0BJ8ZX'>QWA.NT/0BJ8ZX</a>
          <p style={{paddingBottom: 64}}>Scan your QR Code on the devices that you want to sync with.</p>
          <p>You do not know how to do this ?</p>
          <Button secondary label='ADD A DEVICE' />
        </div>
      </Modal>
    )
  }
}
