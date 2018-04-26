import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Signup from './AddDevice'

storiesOf('AddDevice Modal', module)
  .add('addDevice modal', () => (
    <div style={{marginTop: '35%'}}>
      <Signup onClose={action('onClosed')} />
    </div>
  ))
