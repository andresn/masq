import React from 'react'

export default class ButtonsGroup extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      isExpanded: false
    }
    this.expand = this.expand.bind(this)
  }

  expand () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render () {
    const { buttons } = this.props
    const styles = {
      container: {
        display: 'flex',
        alignItems: 'center'
      },
      expandButton: {
        cursor: 'pointer',
        transitionProperty: 'transform',
        transitionDuration: '0.3s'
      },
      button: {
        marginRight: 16
      },
      dot: {
        width: 2,
        height: 2,
        marginBottom: 1,
        borderRadius: '50%',
        border: 'solid 2px var(--grey-200)'
      }
    }

    if (this.state.isExpanded) {
      styles.expandButton['transform'] = 'rotate(90deg)'
    }

    return (
      <div style={styles.container}>
        {this.state.isExpanded && buttons.map((button, index) =>
          <div key={index} style={styles.button}>
            {button}
          </div>
        )}
        <div style={styles.expandButton} onClick={this.expand}>
          <div style={styles.dot} />
          <div style={styles.dot} />
          <div style={styles.dot} />
        </div>
      </div>
    )
  }
}
