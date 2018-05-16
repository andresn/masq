import React from 'react'
import { MemoryRouter } from 'react-router'
import { storiesOf } from '@storybook/react'

import { UserContext } from 'context/user'

import Sidebar from './Sidebar'

const user = {
  image: 'https://randomuser.me/api/portraits/women/79.jpg',
  firstname: 'Alicia',
  lastname: 'Ford',
  username: 'Mustang'
}

storiesOf('Sidebar', module)
  .add('with a user', () => (
    <MemoryRouter>
      <UserContext.Provider value={user}>
        <div style={{height: 800}}>
          <Sidebar user={user} />
        </div>
      </UserContext.Provider>
    </MemoryRouter>
  ))
