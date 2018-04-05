import React from 'react'
import renderer from 'react-test-renderer'

import Devices from './Devices'

it('renders no devices', () => {
  const component = renderer.create(<Devices devices={[]} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders one disabled devices', () => {
  const devices = [{ name: 'Some device', color: '#86e991', enabled: false }]
  const component = renderer.create(<Devices devices={devices} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders one enabled devices', () => {
  const devices = [{ name: 'Some device', color: '#86e991', enabled: true }]
  const component = renderer.create(<Devices devices={devices} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders one new devices', () => {
  const devices = [{ name: 'Some device', color: '#86e991', enabled: false, new: true }]
  const component = renderer.create(<Devices devices={devices} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
