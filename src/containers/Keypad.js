import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MainKeypad from '../components/keypads/MainKeypad'
import ShiftUpKeypad from '../components/keypads/ShiftUpKeypad'
import ShiftDownKeypad from '../components/keypads/ShiftDownKeypad'
import HyperbolicKeypad from '../components/keypads/HyperbolicKeypad'
import ConversionsKeypad from '../components/keypads/ConversionsKeypad'
import AlphaKeypad from '../components/keypads/AlphaKeypad'
import { setShiftKey, shiftKeySelector } from '../ducks/ui'
import { executeKeyCode } from '../cpu/reducer'
import mapKeyboardEvent from '../cpu/keyboardEventMapper'
import K from '../cpu/keyCodes'

class Keypad extends React.PureComponent {

  static propTypes = {
    executeKeyCode: PropTypes.func,
    setShiftKey: PropTypes.func.isRequired,
    shiftKey: PropTypes.string,
  }

  componentDidMount() {
    const elem = document.querySelector('.CalculatorPanel')
    if (elem) {
      elem.addEventListener('keyup', this.keyUpHandler)
    }
  }

  componentWillUnmount() {
    const elem = document.querySelector('.CalculatorPanel')
    if (elem) {
      elem.removeEventListener('keyup', this.keyUpHandler)
    }
  }

  keyUpHandler = ev => {
    const { shiftKey, setShiftKey, executeKeyCode } = this.props
    const keyCode = mapKeyboardEvent(ev)
    if (keyCode) {
      if (shiftKey) {
        setShiftKey(null)
      }
      executeKeyCode({opCode: keyCode})
    }
  }

  onKeyPressed = keyCode => {
    this.props.executeKeyCode({opCode: keyCode})
  }

  render() {
    switch (this.props.shiftKey) {
      case K.SHIFT_UP:
        return <ShiftUpKeypad />
      case K.SHIFT_DOWN:
        return <ShiftDownKeypad />
      case K.HYPER:
        return <HyperbolicKeypad />
      case K.CONV:
        return <ConversionsKeypad />
      case K.ALPHA:
        return <AlphaKeypad />
      default:
        return <MainKeypad />
    }
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    executeKeyCode,
    setShiftKey,
  }, dispatch)

const mapStateToProps = state => ({
  shiftKey: shiftKeySelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Keypad)