import React from 'react'
import { storiesOf } from '@storybook/react'
import Devices from './Devices'

const devices = [
  { name: 'TV de Margaux', color: '#40ae6c', enabled: true, new: true },
  { name: 'iPhone de Margaux', color: '#40ae6c', enabled: true },
  { name: 'iPad de Margaux', color: '#40ae6c', enabled: false },
  { name: 'Oneplus de Matthieu', color: '#40ae6c', enabled: true }
]

storiesOf('Devices Page', module)
  .add('without devices', () => (
    <Devices devices={devices} />
  ))
