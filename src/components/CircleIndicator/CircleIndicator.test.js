import React from 'react'
import renderer from 'react-test-renderer'
import CircleIndicator from './CircleIndicator'

it('renders CircleIndicator with color blue', () => {
  const component = renderer.create(<CircleIndicator color='blue' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders CircleIndicator with color red', () => {
  const component = renderer.create(<CircleIndicator color='red' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
