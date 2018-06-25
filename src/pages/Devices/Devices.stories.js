import React from 'react'
import { storiesOf } from '@storybook/react'
import Devices from './Devices'
import { I18nextProvider } from 'react-i18next'

import i18n from 'i18n/i18n'

const devices = [
  { name: 'TV de Margaux', color: '#40ae6c', enabled: true, new: true },
  { name: 'iPhone de Margaux', color: '#40ae6c', enabled: true },
  { name: 'iPad de Margaux', color: '#40ae6c', enabled: false },
  { name: 'Oneplus de Matthieu', color: '#40ae6c', enabled: true }
]

storiesOf('Devices Page', module)
  .add('with devices', () => (
    <I18nextProvider i18n={i18n}>
      <Devices devices={devices} />
    </I18nextProvider>
  ))
