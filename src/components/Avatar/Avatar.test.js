import React from 'react'
import ReactDOM from 'react-dom'
import Avatar from './Avatar'
// import ReactTestUtils from 'react-dom/test-utils'

it('renders without crashing without upload', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Avatar />, div)
})

it('renders without crashing with upload', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Avatar upload />, div)
})

it('renders without crashing with upload and image', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Avatar upload image='https://randomuser.me/api/portraits/women/79.jpg' />, div)
})

// fit('fileHandler() should be called when clicking on the avatar to upload', () => {
//   const spy = jest.fn()
//   const div = document.createElement('div')
//   const comp = ReactDOM.render(<Avatar upload fileHandler={spy} />, div)
//   // const node = ReactDOM.findDOMNode(comp).getElementsByClassName('Avatar')[0]
//   const node = ReactDOM.findDOMNode(comp).getElementsByClassName('inputfile')[0]
//   ReactTestUtils.Simulate.change(node)
//   // console.log(node)
//   ReactTestUtils.Simulate.click(node)
//   expect(spy.mock.calls.length).toBe(1)
// })
