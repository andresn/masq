import React from 'react'
import renderer from 'react-test-renderer'
import Loading from './Loading'

it('renders Loading page', () => {
  const user = {
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    firstname: 'Alicia',
    lastname: 'Ford',
    username: 'Mustang'
  }
  const component = renderer.create(<Loading user={user} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
