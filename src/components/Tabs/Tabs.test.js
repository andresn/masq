import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from './Tabs'
import { MemoryRouter } from 'react-router'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><Tabs tabs={[]} /></MemoryRouter>, div)
})
