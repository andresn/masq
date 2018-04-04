import React from 'react'
import ReactDOM from 'react-dom'
import CircleIndicator from './CircleIndicator'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CircleIndicator color='blue' />, div)
})
