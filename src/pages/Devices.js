import React from 'react';

import Button from '../components/Button/Button';
// import DeviceCard from '../components/DeviceCard';
// import TextInput from '../components/TextInput/TextInput';
import Card from '../components/Card/Card';

import './Devices.css';

function Separator() {
  return (<div id="separator" style={{ marginTop: '16px' }} />)
}

function LastDevices(props) {
  const { device } = props;
  if (!device) return;

  return (
    <div>
      <h1 style={{marginLeft: '16px'}}>Nouvel appareil</h1>
      <div className="Devices">
        <div>
          <Card title={device.name} description="My description" color={device.color}>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Devices(props) {
  const newDevice = { name: 'TV de Margaux', color: '#a3005c' };

  const devices = [
    { name: 'iPhone de Margaux', color: '#86e991' },
    { name: 'Oneplus de Matthieu', color: '#ee6e7e' }
  ]; // TODO: Fetch devices

  return (
    <div style={{ backgroundColor: '#f5f7fa', paddingTop: '1px' }}>
      <LastDevices device={newDevice}/>

      <h1 style={{marginLeft: '16px'}}>Mes appareils connectés à Masq</h1>
      <div className="Devices">
        {devices.map((device, index) => (
          <div key={index}>
            <Card title={device.name} description="My description" color={device.color}>
            </Card>
          </div>
        ))}
        <Separator />
        <Button label="Add a new device"/>
      </div>
    </div>
  );
}
