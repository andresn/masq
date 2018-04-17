import React from 'react'
import { MemoryRouter } from 'react-router'
import { storiesOf } from '@storybook/react'

import { Smartphone, Apps } from 'icons'

import Tabs from './Tabs'

const tabs = [
  { label: 'Devices', link: '/devices', icon: <Smartphone /> },
  { label: 'Applications', link: '/applications', icon: <Apps /> }
]

storiesOf('Tabs', module)
  .add('with one tab', () => (
    <MemoryRouter><Tabs tabs={[tabs[0]]} /></MemoryRouter>
  ))
  .add('with two tabs', () => (
    <MemoryRouter><Tabs tabs={tabs} /></MemoryRouter>
  ))
