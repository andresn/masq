import React from 'react'
import renderer from 'react-test-renderer'
import TextInput from './TextInput'

it('renders TextInput', () => {
  const component = renderer.create(
    <TextInput label='some button' />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders TextInput with a defaultValue', () => {
  const component = renderer.create(
    <TextInput label='some button' defaultValue='default text' />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders TextInput with error', () => {
  const component = renderer.create(
    <TextInput label='some button' error />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
