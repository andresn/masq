import React from 'react'
import PropTypes from 'prop-types'
import i18next from 'i18next'
import { Trans } from 'react-i18next'
import { remote } from 'electron'
import fs from 'fs'

import { Avatar, TextInput, Button } from 'components'
import { PasswordModal, ImportModal } from 'modals'

import { UserContext } from 'contexts/user'

import './Settings.css'

const dialog = remote.dialog

class Settings extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      image: props.user.image,
      lastname: props.user.lastname,
      firstname: props.user.firstname,
      username: props.user.username
    }

    this.importingRules = {}
    this.passwordModal = false
    this.importModal = false
    this.hasChanged = false
    this.validate = this.validate.bind(this)
    this.isValid = this.isValid.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleImport = this.handleImport.bind(this)
    this.handleImportModalClose = this.handleImportModalClose.bind(this)
    this.handleImportModalConfirm = this.handleImportModalConfirm.bind(this)
    this.handleImportChecked = this.handleImportChecked.bind(this)
    this.handlePasswordModalClose = this.handlePasswordModalClose.bind(this)
    this.handlePasswordModalConfirm = this.handlePasswordModalConfirm.bind(this)
  }

  isValid (fieldName) {
    if (fieldName === 'image') return true
    return this.state[fieldName].length > 0
  }

  onChange (field, event) {
    const value = event.target.value.trim()
    this.hasChanged = true
    this.setState({
      [field]: value
    })
  }

  onImageChange (event) {
    const reader = new window.FileReader()
    const file = event.target.files[0]
    if (!file) {
      return
    }

    reader.addEventListener('load', () => {
      this.hasChanged = true
      this.setState({ image: reader.result })
    })
    reader.readAsDataURL(file)
  }

  validate () {
    if (!this.hasChanged) {
      return
    }

    const { onUpdateUser } = this.props
    // Every fields should be valid
    const isValid = Object.keys(this.state).every(key => this.isValid(key))
    // If invalid, return
    if (!isValid) {
      // forceUpdate to show errors
      return this.forceUpdate()
    }

    onUpdateUser(this.state)
    this.hasChanged = false
  }

  handleKeyUp (e) {
    if (e.key === 'Enter') {
      this.validate()
    }
  }

  handlePasswordModalClose () {
    console.log('handlePasswordModalClose')
    this.passwordModal = false
    this.forceUpdate()
  }

  handlePasswordModalConfirm (password) {
    const { onExport } = this.props
    console.log('handlePasswordModalConfirm', password)
    this.handlePasswordModalClose()
    onExport(password)
  }

  handleExport () {
    console.log('handleExport')
    this.passwordModal = true
    this.forceUpdate()
  }

  handleImportModalClose () {
    console.log('handleImportModalClose')
    this.importModal = false
    this.forceUpdate()
  }

  handleImport () {
    console.log('handleImport')
    const importRules = {}

    dialog.showOpenDialog({ properties: ['openFile'] }, filename => {
      if (!filename) return
      console.log(filename)
      fs.readFile(filename[0], (err, data) => {
        const importedData = JSON.parse(data.toString())
        if (err) throw err
        console.log(data.toString())
        for (let app of Object.values(importedData.appList)) {
          importRules[app.url] = true
        }
        this.importModal = true
        this.importingData = importedData
        this.importingRules = importRules
        console.log('#####', importRules)
        this.forceUpdate()
      })
    })
  }

  handleImportModalConfirm () {
    const { onImport } = this.props
    onImport(this.importingData, this.importingRules, 'qwantmasq')
  }

  handleImportChecked (key, value) {
    this.importingRules[key] = value
    console.log('importingApps', this.importingRules)
  }

  render () {
    return (
      <div className='Settings'>
        <div>
          <div className='title-container'>
            <h1><Trans>Your profile</Trans></h1>
            <h3><Trans>Edit your personal informations</Trans></h3>
          </div>

          <div className='profile'>
            <Avatar upload image={this.state.image} onChange={(e) => this.onImageChange(e)} />
            <div className='inputs'>
              <TextInput
                label={i18next.t('Last Name')}
                error={!this.isValid('lastname')}
                onKeyUp={this.handleKeyUp}
                defaultValue={this.state.lastname} onChange={(e) => this.onChange('lastname', e)}
              />
              <TextInput
                label={i18next.t('First Name')}
                error={!this.isValid('firstname')}
                onKeyUp={this.handleKeyUp}
                defaultValue={this.state.firstname} onChange={(e) => this.onChange('firstname', e)}
              />
              <TextInput
                label={i18next.t('Username (displayed)')}
                error={!this.isValid('username')}
                onKeyUp={this.handleKeyUp}
                defaultValue={this.state.username} onChange={(e) => this.onChange('username', e)}
              />
            </div>
          </div>

          {this.passwordModal &&
            <PasswordModal
              onClose={this.handlePasswordModalClose}
              onConfirm={this.handlePasswordModalConfirm}
            />
          }

          {this.importModal &&
            <ImportModal
              apps={this.importingRules}
              onClose={this.handleImportModalClose}
              onConfirm={this.handleImportModalConfirm}
              onChecked={this.handleImportChecked}
            />
          }

          <div className='appSettings'>
            <div className='title-container'>
              <h1>Qwant Masq settings</h1>
              <h3>Import/Export your data</h3>
            </div>
            <div className='buttons'>
              <div className='exportButton'>
                <Button label={i18next.t('EXPORT')} onClick={this.handleExport} />
              </div>
              <Button label={i18next.t('IMPORT')} onClick={this.handleImport} />
            </div>
          </div>
        </div>

        <div className='sidebar'>
          <Button width={200} secondary={!this.hasChanged} label={i18next.t('SAVE')} onClick={this.validate} />
        </div>
      </div>
    )
  }
}

export default props => (
  <UserContext.Consumer>
    {user => <Settings {...props} user={user} />}
  </UserContext.Consumer>
)

Settings.propTypes = {
  user: PropTypes.object.isRequired,
  onUpdateUser: PropTypes.func,
  onDeleteUser: PropTypes.func
}
