import React from 'react'
import { storiesOf } from '@storybook/react'

import CircleIndicator from './CircleIndicator'

storiesOf('CircleIndicator', module)
  .add('with color blue', () => (
    <CircleIndicator color='blue' />
  ))
  .add('with color red', () => (
    <CircleIndicator color='red' />
  ))
