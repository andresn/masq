import React from 'react'
import renderer from 'react-test-renderer'
import Loading from './Loading'

it('renders Loading page', () => {
  const component = renderer.create(<Loading user={{}} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
