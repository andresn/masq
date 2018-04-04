import React from 'react'
import renderer from 'react-test-renderer'
import Avatar from './Avatar'

it('renders Avatar without upload ability', () => {
  const component = renderer.create(<Avatar />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Avatar with upload ability', () => {
  const component = renderer.create(<Avatar upload />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Avatar with upload ability and an image background', () => {
  const component = renderer.create(<Avatar upload image='https://randomuser.me/api/portraits/women/79.jpg' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
