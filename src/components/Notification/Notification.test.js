import React from 'react'
import renderer from 'react-test-renderer'
import Notification from './Notification'

it('renders Notification', () => {
  const component = renderer.create(<Notification text='some notification' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
