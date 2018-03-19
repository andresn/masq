import React from 'react';

import './SwitchButton.css';

export default class SwitchButton extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount () {
    this.setState({
      checked: this.props.checked || false
    });
  }

  toggle() {
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    let style = {};
    if (this.state.checked) {
      style = { backgroundColor: this.props.color };
    }

    const label = this.state.checked ? 'Enabled' : 'Disabled';

    return (
      <div className="SwitchButton">
        <label>{label}</label>
        <div className="switch-container">
          <input ref="switch" checked={ this.state.checked } onChange={ this.toggle } className="switch" type="checkbox" />
          <div id="background" style={style} >
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
