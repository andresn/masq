import React from 'react'
import { UserContext } from 'contexts/user'
import { storiesOf } from '@storybook/react'
import { I18nextProvider } from 'react-i18next'

import i18n from 'i18n/i18n'

import Settings from './Settings'

const user = {
  image: 'https://randomuser.me/api/portraits/women/79.jpg',
  firstname: 'Alicia',
  lastname: 'Ford',
  username: 'Mustang'
}

storiesOf('Settings Page', module)
  .add('settings', () => (
    <I18nextProvider i18n={i18n}>
      <UserContext.Provider value={user}>
        <Settings user={user} />
      </UserContext.Provider>
    </I18nextProvider>
  ))
