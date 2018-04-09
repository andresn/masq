import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import NewDevice from './NewDevice'

it('renders Register page', () => {
  const component = renderer.create(
    <MemoryRouter>
      <NewDevice />
    </MemoryRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
