import React from 'react'
import { storiesOf } from '@storybook/react'

import Login from './Login'
import { MemoryRouter } from 'react-router'

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
    <div style={{ height: 800 }}>
      <MemoryRouter>
        <Login users={users} onAuth={() => true} />
      </MemoryRouter>
    </div>
  ))
