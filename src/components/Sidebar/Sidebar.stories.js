import React from 'react'
import { MemoryRouter } from 'react-router'
import { storiesOf } from '@storybook/react'

import Sidebar from './Sidebar'

storiesOf('Sidebar', module)
  .add('with a user', () => (
    <MemoryRouter>
      <div style={{height: 800}}>
        <Sidebar />
      </div>
    </MemoryRouter>
  ))
