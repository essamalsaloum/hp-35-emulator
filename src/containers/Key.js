import React from 'react'
import PropTypes from 'prop-types'
import theme from '../theme'
import store from '../store'
import C from '../processor/keyCodes'
import './Key.css'

const styles = {
  topLabel: {
    height: 14,
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: '1em',
    color: theme.shiftUpColor,
    textAlign: 'center',
    marginBottom: 6
  },
  bottomLabel: {
    fontSize: 10,
    backgroundColor: theme.shiftDownBackgroundColor,
    color: theme.shiftDownColor
  }
}

const createMarkup = label => ({ __html: label })

const noop = () => undefined

export default class Key extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    topLabel: PropTypes.string,
    bottomLabel: PropTypes.string,
    width: PropTypes.number,
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  static defaultProps = {
    width: 48,
    topLabel: '',
    bottomLabel: '',
    onClick: noop,
    style: {}
  }

  state = {}

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { shiftKey } = state.keypad
      this.setState({ shiftKey })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  renderTopLabel() {
    const { topLabel } = this.props
    return topLabel !== '' && this.state.shiftKey === C.SHIFT_UP ? (<div style={styles.topLabel}></div>) : (
      <div style={styles.topLabel} dangerouslySetInnerHTML={createMarkup(topLabel)}></div>
    )
  }

  renderBottomLabel() {
    const { bottomLabel } = this.props
    return bottomLabel !== '' && this.state.shiftKey === C.SHIFT_DOWN ? (<div style={styles.bottomLabel}></div>) : (
      <div style={styles.bottomLabel} dangerouslySetInnerHTML={createMarkup(bottomLabel)}></div>
    )
  }

  render() {
    const { label, topLabel, bottomLabel, width, onClick, style } = this.props
    const { shiftKey } = this.state


    let keyLabel = label
    let keyStyle = {}
    if (topLabel !== '' && shiftKey === C.SHIFT_UP) {
      keyLabel = topLabel
      keyStyle = {backgroundColor: theme.shiftUpColor, color: '#fff'}
    } else if (bottomLabel !== '' && shiftKey === C.SHIFT_DOWN) {
      keyLabel = bottomLabel
      keyStyle = {backgroundColor: theme.shiftDownColor, color: '#fff'}
    }

    return (
      <div>
        {this.renderTopLabel()}
        <button
          type="button"
          className="Key"
          style={{ ...style, width, ...keyStyle }}
          onClick={onClick}
          onKeyUp={ev => ev.preventDefault()}
          onKeyDown={ev => ev.preventDefault()}
        >
          <div style={keyStyle} dangerouslySetInnerHTML={createMarkup(keyLabel)}></div>
          {this.renderBottomLabel()}
        </button>
      </div>
    )
  }
}