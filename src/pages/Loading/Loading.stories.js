import React from 'react'
import { storiesOf } from '@storybook/react'

import Loading from './Loading'

storiesOf('Loading Page', module)
  .add('without user', () => (
    <div style={{ height: 800 }}>
      <Loading />
    </div>
  ))
  .add('with a user', () => {
    const user = {
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      firstname: 'Jeffrey',
      lastname: 'Hoffman',
      username: 'Jeff'
    }

    return (
      <div style={{ height: 800 }}>
        <Loading user={user} />
      </div>
    )
  })
