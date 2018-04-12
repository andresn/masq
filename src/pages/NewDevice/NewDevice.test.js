import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import NewDevice from './NewDevice'

it('renders Register page', () => {
  const component = renderer.create(
    <MemoryRouter>
      <NewDevice link='QWA.NT/0BJ8ZX' image='http://www.datafakegenerator.com/temp/test409236e0431d1d4dcf66ffba56d9d43c.png' />
    </MemoryRouter>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
