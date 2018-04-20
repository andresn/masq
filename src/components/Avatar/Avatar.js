import React from 'react'
import PropTypes from 'prop-types'

import { Camera, AddPictures } from 'icons'

import './Avatar.css'

function Replace (props) {
  const { style, onClick } = props
  return (
    <div className='Avatar upload' style={style} onClick={onClick}>
      <Camera className='camera' height={33} width={40} color='white' />
    </div>
  )
}

function NewUpload (props) {
  const { style, onClick } = props
  return (
    <AddPictures
      color='var(--grey-200)'
      className='Avatar upload'
      style={style} onClick={onClick}
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
    const { image, upload, onChange } = this.props
    const style = { backgroundImage: 'url(' + image + ')' }

    return upload
      ? (
        <div>
          <input name='avatar' type='file' ref='fileDialog'
            style={{ display: 'none' }} onChange={onChange}
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
  onChange: PropTypes.func,
  image: PropTypes.string
}
