import React from 'react'
import { storiesOf } from '@storybook/react'

import Splash from './Splash'

storiesOf('Splash Page', module)
  .add('splash', () => (
    <div style={{ height: 800 }}>
      <Splash />
    </div>
  ))
