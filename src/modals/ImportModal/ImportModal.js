import React, { Component } from 'react'
import i18next from 'i18next'
import PropTypes from 'prop-types'

import { Modal, CircleIndicator, Button, SwitchButton } from 'components'

import './ImportModal.css'

class ImportModal extends Component {
  constructor (props) {
    super(props)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleConfirm () {
    const { onConfirm } = this.props
    onConfirm()
  }

  handleChecked (app, state) {
    const { onChecked } = this.props
    console.log('handleChecked', app, state)
    onChecked(app, state)
  }

  render () {
    const { onClose, apps } = this.props
    console.log('Import Modal', apps)

    return (
      <Modal width={511} onClose={onClose}>
        <div className='PasswordModal'>
          <div className='appList'>
            {Object.keys(apps).map(key =>
              <div key={key} className='importLine'>
                <CircleIndicator color='#458bf8' />
                <p style={{marginRight: 16}}>{key}</p>
                <SwitchButton checked={apps[key]} secondary color='#458bf8' onChecked={(state) => this.handleChecked(key, state)} />
              </div>
            )}
          </div>
          <Button label={i18next.t('Import')} onClick={this.handleConfirm} />
        </div>
      </Modal>
    )
  }
}

ImportModal.propTypes = {
  apps: PropTypes.object.isRequired,
  onChecked: PropTypes.func
}

export default ImportModal
