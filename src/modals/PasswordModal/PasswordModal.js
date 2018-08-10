import React, { Component } from 'react'
import i18next from 'i18next'
// import { Trans } from 'react-i18next'

import { Modal, TextInput, Button } from 'components'

import './PasswordModal.css'

export default class PasswordModal extends Component {
  constructor (props) {
    super(props)
    this.password = ''

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleChange (e) {
    this.password = e.target.value
  }

  handleKeyUp (e) {
    if (e.key !== 'Enter') {
      return
    }
    this.handleConfirm()
  }

  handleConfirm () {
    const { onConfirm } = this.props
    onConfirm(this.password)
  }

  render () {
    const { onClose } = this.props

    return (
      <Modal width={511} onClose={onClose}>
        <div className='PasswordModal'>
          <TextInput
            label={i18next.t('Please confirm your password')}
            onKeyUp={this.handleKeyUp}
            onChange={this.handleChange}
            password
            focus
          />
          <Button label={i18next.t('Confirm')} onClick={this.handleConfirm} />
        </div>
      </Modal>
    )
  }
}
