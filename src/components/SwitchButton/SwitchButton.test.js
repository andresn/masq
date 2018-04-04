import React from 'react'
import renderer from 'react-test-renderer'
import SwitchButton from './SwitchButton'

it('renders SwitchButton primary unchecked', () => {
  const component = renderer.create(<SwitchButton checked={false} color='blue' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders SwitchButton primary checked', () => {
  const component = renderer.create(<SwitchButton checked color='blue' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders SwitchButton secondary unchecked', () => {
  const component = renderer.create(<SwitchButton secondary checked={false} color='blue' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders SwitchButton secondary checked', () => {
  const component = renderer.create(<SwitchButton secondary checked color='blue' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
