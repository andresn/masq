import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components'
import AppCard from './AppCard/AppCard'

import './Applications.css'

export default function Applications (props) {
  const { applications } = props

  return (
    <div className='Applications'>
      <div>
        {/* <div className='title-container'>
          <h1>Currently active</h1>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        </div>
        <div className='cards-grid'>
          {applications.map((app, index) =>
            <AppCard key={index} index={index} app={app} />
          )}
        </div> */}

        <div className='title-container'>
          <h1>My applications</h1>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        </div>
        <div className='cards-grid'>
          {applications.map((app, index) =>
            <AppCard key={index} index={index} app={app} />
          )}
        </div>
      </div>
      <div className='sidebar'>
        <Button secondary label='ADD A NEW APPLICATION' />
      </div>
    </div>
  )
}

Applications.propTypes = {
  applications: PropTypes.array,
  onChecked: PropTypes.func
}
