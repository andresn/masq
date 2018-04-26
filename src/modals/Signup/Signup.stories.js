import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Signup from './Signup'

storiesOf('Signup Modal', module)
  .add('signup modal', () => (
    <div style={{marginTop: '35%'}}>
      <Signup onClose={action('onClosed')} />
    </div>
  ))
