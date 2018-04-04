import React from 'react'
import Card from './Card'
import renderer from 'react-test-renderer'

it('renders Card disabled', () => {
  const component = renderer.create(<Card enabled color='blue' title='sometitle' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Card enabled', () => {
  const component = renderer.create(<Card enabled={false} color='blue' title='sometitle' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Card with a description', () => {
  const component = renderer.create(
    <Card enabled={false} color='blue' title='sometitle'
      description='some description'
    />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Card with an image', () => {
  const component = renderer.create(
    <Card enabled={false} color='blue' title='sometitle'
      image='https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
    />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
