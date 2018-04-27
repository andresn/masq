import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AuthApp from './AuthApp'

const appInfo = {
  url: 'https://masq.io/search',
  name: 'Masq Search',
  description: 'Masq Search'
}

storiesOf('AuthApp Modal', module)
  .add('authApp modal', () => (
    <div style={{marginTop: '35%'}}>
      <AuthApp
        onClose={action('onClosed')}
        onReject={action('rejected')}
        onAccept={action('accepted')}
        app={appInfo} />
    </div>
  ))
