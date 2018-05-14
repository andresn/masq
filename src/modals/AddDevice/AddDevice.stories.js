import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AddDevice from './AddDevice'

storiesOf('AddDevice Modal', module)
  .add('addDevice modal', () => (
    <div style={{marginTop: '35%'}}>
      <AddDevice onClose={action('onClosed')} />
    </div>
  ))
