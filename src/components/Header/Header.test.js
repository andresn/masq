import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import { UserContext } from 'context/user'

import Header from './Header'

it('renders Header', () => {
  const component = renderer.create(<MemoryRouter><Header /></MemoryRouter>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Header with shadow', () => {
  const component = renderer.create(<MemoryRouter><Header shadow /></MemoryRouter>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Header with a user', () => {
  const user = {
    username: 'some username',
    firstname: 'some firstname',
    lastname: 'some lastname',
    image: 'https://randomuser.me/api/portraits/women/79.jpg'
  }
  const component = renderer.create(
    <MemoryRouter>
      <UserContext.Provider value={user}>
        <Header />
      </UserContext.Provider>
    </MemoryRouter>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
