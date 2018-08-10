import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { I18nextProvider } from 'react-i18next'

import i18n from 'i18n/i18n'

import Signup from './Signup/Signup'
import AuthApp from './AuthApp/AuthApp'
import AddDevice from './AddDevice/AddDevice'
import ImportModal from './ImportModal/ImportModal'
import PasswordModal from './PasswordModal/PasswordModal'

const appInfo = {
  url: 'https://masq.io/search',
  name: 'Masq Search',
  description: 'Masq Search',
  securityCode: '1234'
}

storiesOf('Modals', module)
  .add('signup modal', () => (
    <I18nextProvider i18n={i18n}>
      <div style={{marginTop: '35%'}}>
        <Signup onClose={action('onClosed')} />
      </div>
    </I18nextProvider>
  ))
  .add('authApp modal', () => (
    <I18nextProvider i18n={i18n}>
      <div style={{marginTop: '35%'}}>
        <AuthApp
          onClose={action('onClosed')}
          onReject={action('rejected')}
          onAccept={action('accepted')}
          app={appInfo}
        />
      </div>
    </I18nextProvider>
  ))
  .add('addDevice modal', () => (
    <I18nextProvider i18n={i18n}>
      <div style={{marginTop: '35%'}}>
        <AddDevice onClose={action('onClosed')} />
      </div>
    </I18nextProvider>
  ))
  .add('Import modal', () => (
    <I18nextProvider i18n={i18n}>
      <div style={{marginTop: '25%'}}>
        <ImportModal
          onClose={action('onClosed')}
          onConfirm={action('password')}
          apps={{'maps': true}}
          onChecked={(key, value) => console.log('###', key, value)}
        />
      </div>
    </I18nextProvider>
  ))
  .add('Password modal', () => (
    <I18nextProvider i18n={i18n}>
      <div style={{marginTop: '25%'}}>
        <PasswordModal onClose={action('onClosed')} onConfirm={action('password')} />
      </div>
    </I18nextProvider>
  ))
