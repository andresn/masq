import React from 'react';
import { withRouter } from 'react-router-dom';

const style = {
  height: '65px',
  backgroundColor: '#f5f7fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly'
};

const styleTab = {
  display: 'flex',
  alignItems: 'center'
};

const styleActiveTab = {
  display: 'flex',
  alignItems: 'center'
}

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
          <div style={ index === activeTab ? styleActiveTab : styleTab }
               key={index}
               onClick={() => this.onSelectTab(index)}
          >
            <img src={tab.icon} alt={tab.icon} />
            <p style={{marginLeft: '8px', color: '#191919'}}>{tab.label}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(Tabs)
