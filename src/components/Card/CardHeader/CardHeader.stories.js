import React from 'react'
import { storiesOf } from '@storybook/react'

import CardHeader from './CardHeader'

storiesOf('CardHeader', module)
  .add('enabled', () => (
    <CardHeader enabled color='blue' />
  ))
  .add('disabled', () => (
    <CardHeader enabled={false} color='blue' />
  ))
