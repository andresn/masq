import React from 'react'
import PropTypes from 'prop-types'
import Camera from 'icons/Camera'

import './Avatar.css'

export default class Avatar extends React.Component {
  constructor (props) {
    super(props)
    this.openDialog = this.openDialog.bind(this)
  }

  openDialog (e) {
    this.refs.fileDialog.click()
  }

  render () {
    const { image, upload, fileHandler } = this.props
    const style = { backgroundImage: 'url(' + image + ')' }

    return upload
      ? (
        <div>
          <input name='avatar' type='file' ref='fileDialog'
            style={{ display: 'none' }} onChange={fileHandler}
            accept='.jpg, .jpeg, .png'
          />
          <div className='Avatar upload' style={style} onClick={this.openDialog}>
            <Camera className='camera' height={33} width={40} color='white' />
          </div>
        </div>)
      : <div className='Avatar' style={style} />
  }
}

Avatar.propTypes = {
  upload: PropTypes.bool,
  image: PropTypes.string,
  fileHandler: PropTypes.func
}
