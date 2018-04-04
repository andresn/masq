import React from 'react'
import renderer from 'react-test-renderer'
import LoadingDots from './LoadingDots'

it('renders LoadingDots', () => {
  const component = renderer.create(<LoadingDots />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
