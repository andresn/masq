import React from 'react'
import { storiesOf } from '@storybook/react'

import Loading from './Loading'

storiesOf('Loading Page', module)
  .add('loading', () => (
    <div style={{ height: 800 }}>
      <Loading />
    </div>
  ))
