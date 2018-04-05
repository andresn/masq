import React from 'react'
import renderer from 'react-test-renderer'
import Applications from './Applications'

it('renders Applications page with one active app', () => {
  const applications = [
    {
      name: 'Qwant Music',
      color: '#5c00f3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      enabled: true,
      image: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
      active: true
    }
  ]
  const component = renderer.create(<Applications applications={applications} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders Applications page with one inactive app', () => {
  const applications = [
    {
      name: 'Qwant Music',
      color: '#5c00f3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      enabled: true,
      image: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
    }
  ]
  const component = renderer.create(<Applications applications={applications} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
