import React from 'react'

import { Close } from 'icons'

const styles = {
  modal: {
    backgroundColor: 'white',
    width: 511,
    height: 670,
    boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.16)'
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
  return (
    <div style={styles.modal}>
      <Close style={styles.close} width={9} height={9} onClick={props.onClose} />
      {props.children}
    </div>
  )
}
