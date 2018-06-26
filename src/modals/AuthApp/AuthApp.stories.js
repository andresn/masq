import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { I18nextProvider } from 'react-i18next'

import i18n from 'i18n/i18n'

import AuthApp from './AuthApp'

const appInfo = {
  url: 'https://masq.io/search',
  name: 'Masq Search',
  description: 'Masq Search'
}

storiesOf('AuthApp Modal', module)
  .add('authApp modal', () => (
    <I18nextProvider i18n={i18n}>
      <div style={{marginTop: '35%'}}>
        <AuthApp
          onClose={action('onClosed')}
          onReject={action('rejected')}
          onAccept={action('accepted')}
          app={appInfo} />
      </div>
    </I18nextProvider>
  ))
