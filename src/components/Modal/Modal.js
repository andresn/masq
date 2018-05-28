import React from 'react'
import PropTypes from 'prop-types'

import { Close } from 'icons'

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 2
  },
  modal: {
    zIndex: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.16)',
    opacity: 1
  },
  close: {
    float: 'right',
    marginTop: 20,
    marginRight: 20,
    color: '#191919',
    opacity: 0.4,
    cursor: 'pointer'
  }
}

export default function Modal (props) {
  const modalStyle = Object.assign({}, styles.modal)
  modalStyle['height'] = props.height
  modalStyle['width'] = props.width

  return (
    <div>
      <div style={styles.overlay} onClick={props.onClose} />
      <div style={modalStyle}>
        <Close style={styles.close} width={9} height={9} onClick={props.onClose} />
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func
}
