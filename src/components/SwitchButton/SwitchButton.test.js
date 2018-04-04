import React from 'react'
import ReactDOM from 'react-dom'
import SwitchButton from './SwitchButton'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SwitchButton checked color='blue' />, div)
})
