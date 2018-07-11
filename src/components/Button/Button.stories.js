import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './Button'

storiesOf('Button', module)
  .add('primary with a label', () => (
    <div style={{marginTop: 30}}>
      <Button label='SOME BUTTON' onClick={action('clicked')} />
    </div>
  ))
  .add('secondary with a label', () => (
    <div style={{marginTop: 30}}>
      <Button label='SOME BUTTON' secondary onClick={action('clicked')} />
    </div>
  ))
