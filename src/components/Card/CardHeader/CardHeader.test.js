import React from 'react'
import ReactDOM from 'react-dom'
import CardHeader from './CardHeader'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CardHeader enabled color='blue' />, div)
})
