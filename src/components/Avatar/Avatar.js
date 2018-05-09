import React from 'react'
import PropTypes from 'prop-types'

import { Camera, CameraSquare } from 'icons'

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
    <CameraSquare
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
    const { image, user, upload, onChange } = this.props
    const style = { backgroundImage: 'url(' + image + ')' }

    if (upload) {
      return (
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
    }

    return image
      ? <div className='Avatar' style={style} />
      : (
        <div className='Avatar initials' style={{backgroundColor: 'var(--blue-300)', position: 'relative'}}>
          <p>{user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase()}</p>
        </div>
      )
  }
}

Avatar.propTypes = {
  upload: PropTypes.bool,
  onChange: PropTypes.func,
  image: PropTypes.string
}
