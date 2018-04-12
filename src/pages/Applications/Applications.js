import React from 'react'
import PropTypes from 'prop-types'

import { Separator } from 'components'
import AppCard from './AppCard/AppCard'

import './Applications.css'

function AppRows (props) {
  const { applications, active } = props
  return (
    applications.map((app, index) => (
      app.active === active
        ? (
          <div key={index} >
            <AppCard app={app} onChecked={() => props.onChecked(index)} />
            <Separator />
          </div>
        )
        : null
    ))
  )
}

export default function Applications (props) {
  const { applications, onChecked } = props

  return (
    <div>
      <h2 style={{marginLeft: '16px'}}>Currently active Applications</h2>
      <div className='Applications'>
        <AppRows applications={applications} active onChecked={onChecked} />
      </div>

      <h2 style={{marginLeft: '16px'}}>Currently connected to your Masq</h2>
      <div className='Applications'>
        <AppRows applications={applications} onChecked={onChecked} />
      </div>
    </div>
  )
}

Applications.propTypes = {
  applications: PropTypes.array,
  onChecked: PropTypes.func
}
