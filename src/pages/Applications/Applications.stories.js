import React from 'react'
import { storiesOf } from '@storybook/react'
import Applications from './Applications'
import { I18nextProvider } from 'react-i18next'

import i18n from 'i18n/i18n'

const applications = [
  {
    'name': 'Qwant Music',
    'color': '#a3005c',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    'enabled': true,
    'image': 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    'active': true
  },
  {
    'name': 'Qwant Maps',
    'color': '#a3005c',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    'enabled': false,
    'image': 'https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    'logo': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Qwant-v3.png'
  },
  {
    'name': 'Qwant Shopping',
    'color': '#a3005c',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    'enabled': true
  }
]

storiesOf('Applications Page', module)
  .add('with applications', () => (
    <I18nextProvider i18n={i18n}>
      <Applications applications={applications} t={key => key} />
    </I18nextProvider>
  ))
