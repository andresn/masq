import React from 'react'
import renderer from 'react-test-renderer'
import Login from './Login'
import { MemoryRouter } from 'react-router'

it('renders Login without users', () => {
  const component = renderer.create(<MemoryRouter><Login users={[]} auth={() => true} /></MemoryRouter>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Login with users', () => {
  const users = [
    {
      image: 'https://randomuser.me/api/portraits/women/79.jpg',
      firstname: 'Alicia',
      lastname: 'Ford',
      username: 'Mustang'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      firstname: 'Jeffrey',
      lastname: 'Hoffman',
      username: 'Jeff'
    }
  ]
  const component = renderer.create(<MemoryRouter><Login users={users} auth={() => true} /></MemoryRouter>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
