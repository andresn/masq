import React from 'react';
import ReactSVG from 'react-svg';
import { withRouter } from 'react-router-dom';

import './Tabs.css';

const style = {
  height: '65px',
  backgroundColor: '#f5f7fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  color: '#707070',
  position: 'relative'
  // boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.15)'
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      activeTab: 0
    }
  }

  onSelectTab(key) {
    console.log('onSelectTab')
    const { history, tabs } = this.props;

    this.setState({ activeTab: key });
    history.push(tabs[key].link);
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div style={style}>
        {this.props.tabs.map((tab, index) => (
          <div className={ 'tab ' + (index === activeTab ? 'active' : 'inactive') }
               key={index}
               onClick={() => this.onSelectTab(index)}
          >
            <ReactSVG className="icon" path={tab.icon} />
            {/* <img src={tab.icon} alt={tab.icon} /> */}
            <p style={{marginLeft: '8px'}}>{tab.label}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(Tabs)
