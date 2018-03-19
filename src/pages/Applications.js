import React from 'react';

import Card from '../components/Card/Card';

import './Applications.css';

export default function Applications(props) {
  const apps = [
    {
      name: 'Qwant Maps',
      color: '#01cbd9',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      enabled: true
    },
    {
      name: 'Qwant Shopping',
      color: '#a3005c',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      enabled: false,
      image: 'https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
    }
  ];

  const connectedApps = [
    {
      name: 'Qwant Music',
      color: '#a3005c',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      enabled: true,
      image: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f5f7fa', paddingTop: '1px' }}>

      <h1 style={{marginLeft: '16px'}}>Currently active Applications</h1>
      <div className="Applications">
        {apps.map((app, index) => (
          <Card key={index} title={app.name} description={app.description} color={app.color} enabled={app.enabled} image={app.image} >
          </Card>
        ))}
      </div>

      <h1 style={{marginLeft: '16px'}}>Currently connected to your Masq</h1>
      <div className="Applications">
        {connectedApps.map((app, index) => (
          <Card key={index} title={app.name} description={app.description} color={app.color} enabled={app.enabled} image={app.image} >
          </Card>
        ))}
      </div>
    </div>
  );
}
