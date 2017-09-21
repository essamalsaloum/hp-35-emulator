import React from 'react'
import PropTypes from 'prop-types'
import theme from '../theme'
import store from '../store'
import C from '../processor/keyCodes'
import { execute } from '../processor'
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


const shiftKeyModifiers = {
  [C.EXP]: { [C.SHIFT_UP]: C.ALOG },
  [C.SIN]: { [C.SHIFT_DOWN]: C.ASIN },
  [C.COS]: { [C.SHIFT_DOWN]: C.ACOS },
  [C.TAN]: { [C.SHIFT_DOWN]: C.ATAN },
}

const createMarkup = label => ({ __html: label })

const noop = () => undefined

export default class Key extends React.PureComponent {

  static propTypes = {
    keyCode: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    topLabel: PropTypes.string,
    bottomLabel: PropTypes.string,
    width: PropTypes.number,
    style: PropTypes.object,
    addClass: PropTypes.string
  }

  static defaultProps = {
    width: 48,
    topLabel: '',
    bottomLabel: '',
    onClick: noop,
    style: {}
  }

  state = {}

  storeProcessorState = store.setSubState('processor')
  updateKeypadState = store.setSubState('keypad')

  componentWillMount() {
    this.subscription = store.subscribe(state => {
      const { shiftKey } = state.keypad
      this.setState({ shiftKey })
    })
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  onClick(keyCode) {
    const { shiftKey } = this.state
    if (keyCode === C.SHIFT_UP) {
      this.updateKeypadState({ shiftKey: shiftKey === C.SHIFT_UP ? null : C.SHIFT_UP })
    }
    else if (keyCode === C.SHIFT_DOWN) {
      this.updateKeypadState({ shiftKey: shiftKey === C.SHIFT_DOWN ? null : C.SHIFT_DOWN })
    } else {
      const keyMap = shiftKeyModifiers[keyCode]
      keyCode = (keyMap && keyMap[shiftKey]) || keyCode
      const newState = execute(store.getState().processor, keyCode)
      store.setState({
        processor: { ...newState },
        keypad: { shiftKey: null }
      })
    }
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
    const { label, topLabel, bottomLabel, keyCode, addClass } = this.props
    const { shiftKey } = this.state


    let keyLabel = label
    let keyStyle = {}
    if ((topLabel || keyCode === C.SHIFT_UP) && shiftKey === C.SHIFT_UP) {
      keyLabel = topLabel || label
      keyStyle = { backgroundColor: theme.shiftUpColor, color: '#fff' }
    } else if ((bottomLabel || keyCode === C.SHIFT_DOWN) && shiftKey === C.SHIFT_DOWN) {
      keyLabel = bottomLabel || label
      keyStyle = { backgroundColor: theme.shiftDownColor, color: '#fff' }
    }

    return (
      <div>
        {this.renderTopLabel()}
        <button
          type="button"
          className={`Key ${addClass} Key--keyCode-${keyCode}`}
          style={keyStyle}
          onClick={() => this.onClick(keyCode)}
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