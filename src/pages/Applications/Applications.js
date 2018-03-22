import React from 'react'

import Card from 'components/Card/Card'
import Separator from 'components/Separator'
import Chevron from 'icons/Chevron'

import './Applications.css'

let apps = [
  {
    name: 'Qwant Shopping',
    color: '#01cbd9',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    enabled: true
  }
]

let connectedApps = [
  {
    name: 'Qwant Maps',
    color: '#a3005c',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    enabled: false,
    image: 'https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
  },
  {
    name: 'Qwant Music',
    color: '#5c00f3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    enabled: true,
    image: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
  }
]

export default function Applications (props) {
  return (
    <div style={{ backgroundColor: '#f5f7fa', paddingTop: '1px' }}>

      <h1 style={{marginLeft: '16px'}}>Currently active Applications</h1>
      <div className='Applications'>
        {apps.map((app, index) => (
          <div key={index}>
            <Card title={app.name} description={app.description} color={app.color} enabled={app.enabled} image={app.image}>
              <div className='permissions'>
                <p>5 PERMISSIONS</p>
                <div className='more'>
                  <p style={{ color: app.color }}>VOIR PLUS</p>
                  <Chevron className='caret-icon' color={app.color} />
                </div>
              </div>
            </Card>
            <Separator />
          </div>
        ))}
      </div>

      <h1 style={{marginLeft: '16px'}}>Currently connected to your Masq</h1>
      <div className='Applications'>
        {connectedApps.map((app, index) => (
          <div key={index} >
            <Card title={app.name} description={app.description} color={app.color} enabled={app.enabled} image={app.image} >
              <div className='permissions'>
                <p>5 PERMISSIONS</p>
                <div className='more'>
                  <p style={{ color: app.color }}>VOIR PLUS</p>
                  <Chevron className='caret-icon' color={app.color} />
                </div>
              </div>
            </Card>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  )
}
