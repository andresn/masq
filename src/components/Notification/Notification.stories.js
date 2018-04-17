import React from 'react'
import { storiesOf } from '@storybook/react'
import Notification from './Notification'

storiesOf('Notification', module)
  .add('notification', () => (
    <Notification text='some notification' />
  ))
