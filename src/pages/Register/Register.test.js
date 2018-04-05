import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import Register from './Register'

it('renders Register page', () => {
  const component = renderer.create(<MemoryRouter><Register /></MemoryRouter>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
