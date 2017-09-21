import React from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import C from '../processor/keyCodes'
import { execute } from '../processor'
import './Key.css'

const shiftKeyModifiers = {
  [C.EXP]: { [C.SHIFT_UP]: C.ALOG },
  [C.SIN]: { [C.SHIFT_DOWN]: C.ASIN },
  [C.COS]: { [C.SHIFT_DOWN]: C.ACOS },
  [C.TAN]: { [C.SHIFT_DOWN]: C.ATAN },
}

const createMarkup = label => ({ __html: label })

export default class Key extends React.PureComponent {

  static propTypes = {
    keyCode: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    topLabel: PropTypes.string,
    bottomLabel: PropTypes.string,
    addClass: PropTypes.string
  }

  static defaultProps = {
    topLabel: '',
    bottomLabel: '',
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

  renderBottomLabel() {
    const { bottomLabel } = this.props
    return bottomLabel !== '' && this.state.shiftKey === C.SHIFT_DOWN ? (<div className="Key--bottomLabel"></div>) : (
      <div className="Key--bottomLabel" dangerouslySetInnerHTML={createMarkup(bottomLabel)}></div>
    )
  }

  render() {
    const { label, topLabel, bottomLabel, keyCode, addClass } = this.props
    const { shiftKey } = this.state

    const decorator = {
      label,
      shiftKey: ''
    }
    if ((topLabel || keyCode === C.SHIFT_UP) && shiftKey === C.SHIFT_UP) {
      decorator.label = topLabel || label
      decorator.shiftKey = shiftKey
    } else if ((bottomLabel || keyCode === C.SHIFT_DOWN) && shiftKey === C.SHIFT_DOWN) {
      decorator.label = bottomLabel || label
      decorator.shiftKey = shiftKey
    }

    return (
      <div>
        <div className="Key--topLabel" dangerouslySetInnerHTML={createMarkup(topLabel)}></div>
        <button
          type="button"
          className={`Key ${addClass} Key--keyCode-${keyCode} Key--inverse-${decorator.shiftKey}`}
          onClick={() => this.onClick(keyCode)}
          onKeyUp={ev => ev.preventDefault()}
          onKeyDown={ev => ev.preventDefault()}
        >
          <div className={`Key--inverse-${decorator.shiftKey}`} dangerouslySetInnerHTML={createMarkup(decorator.label)}></div>
          {this.renderBottomLabel()}
        </button>
      </div>
    )
  }
}