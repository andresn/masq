import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Button from './Button'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Button label='somebutton' />, div)
})

it('renders primary button', () => {
  const component = renderer.create(<Button label='somebutton' />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders secondary button', () => {
  const component = renderer.create(<Button label='somebutton' secondary />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
