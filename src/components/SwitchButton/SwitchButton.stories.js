import React from 'react'
import { storiesOf } from '@storybook/react'

import SwitchButton from './SwitchButton'

storiesOf('SwitchButton', module)
  .add('primary unchecked', () => (
    <SwitchButton color='blue' />
  ))
  .add('primary checked', () => (
    <SwitchButton checked color='blue' />
  ))
  .add('secondary unchecked', () => (
    <SwitchButton secondary color='blue' />
  ))
  .add('secondary checked', () => (
    <SwitchButton secondary checked color='blue' />
  ))
