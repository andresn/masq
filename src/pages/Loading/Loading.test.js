import React from 'react'
import renderer from 'react-test-renderer'
import Loading from './Loading'

import { UserContext } from 'context/user'

it('renders Loading page', () => {
  const user = {
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    firstname: 'Alicia',
    lastname: 'Ford',
    username: 'Mustang'
  }

  const component = renderer.create(
    <UserContext.Provider value={user}>
      <Loading user={user} />
    </UserContext.Provider>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
