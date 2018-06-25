import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { I18nextProvider } from 'react-i18next'

import i18n from 'i18n/i18n'

import Signup from './Signup'

storiesOf('Signup Modal', module)
  .add('signup modal', () => (
    <I18nextProvider i18n={i18n}>
      <div style={{marginTop: '35%'}}>
        <Signup onClose={action('onClosed')} />
      </div>
    </I18nextProvider>
  ))
