import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './Tabs.css'

const style = {
  height: '65px',
  backgroundColor: '#f5f7fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  color: '#707070',
  position: 'relative'
}

class Tabs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: [],
      activeTab: 0
    }
  }

  onSelectTab (key) {
    const { history, tabs } = this.props

    this.setState({ activeTab: key })
    history.push(tabs[key].link)
  }

  render () {
    const { activeTab } = this.state

    return (
      <div style={style}>
        {this.props.tabs.map((tab, index) => (
          <div className={'tab ' + (index === activeTab ? 'active' : 'inactive')}
            key={index}
            onClick={() => this.onSelectTab(index)}
          >
            { tab.icon }
            <p style={{marginLeft: '8px'}}>{tab.label}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(Tabs)

Tabs.propTypes = {
  tabs: PropTypes.arrayOf((propValue, key) => {
    const requiredKeys = ['label', 'link', 'icon']
    const propKeys = Object.keys(propValue[key])

    for (let key of requiredKeys) {
      if (!propKeys.includes(key)) return new Error(key + ' is required')
    }
  })
}
