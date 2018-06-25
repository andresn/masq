import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'

import i18n from 'i18n/i18n'

import Login from './Login'

const users = [
  {
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    firstname: 'Alicia',
    lastname: 'Ford',
    username: 'Mustang'
  },
  {
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    firstname: 'Jeffrey',
    lastname: 'Hoffman',
    username: 'Jeff'
  }
]

storiesOf('Login Page', module)
  .add('login', () => (
    <I18nextProvider i18n={i18n}>
      <div style={{ height: 800 }}>
        <MemoryRouter>
          <Login users={users} onAuth={() => true} />
        </MemoryRouter>
      </div>
    </I18nextProvider>
  ))
