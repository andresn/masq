import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Devices from './pages/Devices';
import Applications from './pages/Applications';
import Settings from './pages/Settings';

import Header from './components/Header/Header';
import Tabs from './components/Tabs';
// import Notification from './components/Notification/Notification';
// import SwitchButton from './components/SwitchButton';

import './App.css';

const Login = () => (
  <div style={{ backgroundColor: '#464646', color: '#ffffff' }}>
    <h2>Login page</h2>
  </div>
)

const tabs = [
  { label: 'Devices', link: '/devices', icon: 'assets/Smartphone.svg' },
  { label: 'Applications', link: '/applications', icon: 'assets/Apps.svg' },
  { label: 'Settings', link: '/settings', icon: 'assets/Settings.svg' }
];

// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <h1 className="App-title">Welcome to React</h1>
// </header>

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          {/* <SwitchButton/> */}
          <Header
            title="Hello"
            username="Geoffrey"
          >
            {/* <Notification text='Notification !'/> */}
          </Header>

          <Tabs tabs={tabs}/>

          {/* <li><Link to="/login">Login</Link></li> */}

          <Route path="/login" component={Login}/>
          <Route path="/devices" component={Devices}/>
          <Route path="/applications" component={Applications}/>
          <Route path="/settings" component={Settings}/>
        </div>
      </Router>
    );
  }
}

export default App;
