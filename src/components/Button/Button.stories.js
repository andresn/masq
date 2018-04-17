import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './Button'

storiesOf('Button', module)
  .add('primary with a label', () => (
    <Button label='somebutton' onClick={action('clicked')} />)
  )
  .add('secondary with a label', () => (
    <Button label='somebutton' secondary onClick={action('clicked')} />)
  )
