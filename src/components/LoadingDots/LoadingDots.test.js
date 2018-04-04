import React from 'react'
import ReactDOM from 'react-dom'
import LoadingDots from './LoadingDots'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LoadingDots />, div)
})
