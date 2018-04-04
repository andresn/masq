import React from 'react'
import renderer from 'react-test-renderer'
import Tabs from './Tabs'
import { MemoryRouter } from 'react-router'

import { Smartphone, Apps } from 'icons'

const tabs = [
  { label: 'Devices', link: '/devices', icon: <Smartphone /> },
  { label: 'Applications', link: '/applications', icon: <Apps /> }
]

it('renders Tabs with one tabs', () => {
  const component = renderer.create(
    <MemoryRouter><Tabs tabs={[tabs[0]]} /></MemoryRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Tabs with two tabs', () => {
  const component = renderer.create(
    <MemoryRouter><Tabs tabs={tabs} /></MemoryRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
