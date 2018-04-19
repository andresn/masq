import React from 'react'
import { storiesOf } from '@storybook/react'

import SwitchButton from './SwitchButton'

storiesOf('SwitchButton', module)
  .add('primary unchecked', () => (
    <SwitchButton color='#40ae6c' />
  ))
  .add('primary checked', () => (
    <SwitchButton checked color='#40ae6c' />
  ))
  .add('secondary unchecked', () => (
    <SwitchButton secondary color='#458bf8' />
  ))
  .add('secondary checked', () => (
    <SwitchButton secondary checked color='#458bf8' />
  ))
