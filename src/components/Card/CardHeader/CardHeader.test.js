import React from 'react'
import renderer from 'react-test-renderer'
import CardHeader from './CardHeader'

it('renders CardHeader disabled', () => {
  const component = renderer.create(<CardHeader enabled={false} color='blue' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders CardHeader enabled', () => {
  const component = renderer.create(<CardHeader enabled color='blue' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
