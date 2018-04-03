import React from 'react'
import PropTypes from 'prop-types'

import { Camera, AddPictures } from 'icons'

import './Avatar.css'

function Replace (props) {
  return (
    <div className='Avatar upload' style={props.style} onClick={props.onClick}>
      <Camera className='camera' height={33} width={40} color='white' />
    </div>
  )
}

function NewUpload (props) {
  return (
    <AddPictures
      color='var(--grey2-color)'
      className='Avatar upload'
      style={props.style} onClick={props.onClick}
    />
  )
}

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

          {image
            ? <Replace style={style} onClick={this.openDialog} />
            : <NewUpload style={style} onClick={this.openDialog} />
          }
        </div>)
      : <div className='Avatar' style={style} />
  }
}

Avatar.propTypes = {
  upload: PropTypes.bool,
  image: PropTypes.string,
  fileHandler: PropTypes.func
}
