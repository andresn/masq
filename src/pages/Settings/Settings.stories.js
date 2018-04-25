import React from 'react'
import { UserContext } from 'context/user'
import { storiesOf } from '@storybook/react'

import Settings from './Settings'

const user = {
  image: 'https://randomuser.me/api/portraits/women/79.jpg',
  firstname: 'Alicia',
  lastname: 'Ford',
  username: 'Mustang'
}

storiesOf('Settings Page', module)
  .add('settings', () => (
    <UserContext.Provider value={user}>
      <Settings user={user} />
    </UserContext.Provider>
  ))
