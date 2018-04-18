import React from 'react'
import { storiesOf } from '@storybook/react'

import Sidebar from './Sidebar'

storiesOf('Sidebar', module)
  .add('with a user', () => (
    <Sidebar />
  ))
