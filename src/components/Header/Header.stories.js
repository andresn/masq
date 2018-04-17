import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import { UserContext } from 'context/user'

import Header from './Header'

const user = {
  username: 'some username',
  firstname: 'some firstname',
  lastname: 'some lastname',
  image: 'https://randomuser.me/api/portraits/women/79.jpg'
}

storiesOf('Header', module)
  .add('default header', () => (
    <MemoryRouter><Header /></MemoryRouter>
  ))
  .add('with shadow', () => (
    <MemoryRouter><Header shadow /></MemoryRouter>
  ))
  .add('with a user logged in', () => (
    <MemoryRouter>
      <UserContext.Provider value={user}>
        <Header />
      </UserContext.Provider>
    </MemoryRouter>
  ))
