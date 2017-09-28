import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import C from '../processor/keyCodes'
import Key from './Key'
import { setShiftKey, shiftKeySelector } from '../ducks/shiftKey'
import { injectKeyCode } from '../ducks/processor'
import mapKeyboardEvent from '../processor/keyboardEventMapper'
import './Keypad.css'

class Keypad extends React.PureComponent {

  static propTypes = {
    injectKeyCode: PropTypes.func,
    setShiftKey: PropTypes.func.isRequired,
    shiftKey: PropTypes.string
  }

  keyUpHandler = ev => {
    const {shiftKey, setShiftKey, injectKeyCode} = this.props
    ev.preventDefault()
    ev.stopPropagation()
    const keyCode = mapKeyboardEvent(ev)
    if (keyCode) {
      if (shiftKey) {
        setShiftKey(null)
      }
      injectKeyCode(keyCode)
    }
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

  render() {
    return (
      <div className="Keypad">
        <div className="Keypad--row">
          <Key label="𝑦<sup>𝑥</sup>" keyCode={C.POW} />
          <Key label="LOG" keyCode={C.LOG} />
          <Key label="LN" keyCode={C.LN} />
          <Key label="𝑒<sup>𝑥</sup>" topLabel="10<sup>𝑥</sup>" keyCode={C.EXP} />
          <Key label="CLR" keyCode={C.CLR} />
        </div>
        <div className="Keypad--row">
          <Key label="√𝑥" keyCode={C.SQRT} />
          <Key label="𝑥²" keyCode={C.SQR} />
          <Key label="SIN" bottomLabel="ASIN" keyCode={C.SIN} />
          <Key label="COS" bottomLabel="ACOS" keyCode={C.COS} />
          <Key label="TAN" bottomLabel="ATAN" keyCode={C.TAN} />
        </div>
        <div className="Keypad--row">
          <Key label="1/𝑥" keyCode={C.RECIPROCAL} />
          <Key label="𝑥↔︎𝑦" keyCode={C.SWAP} />
          <Key label="R↓" keyCode={C.ROLL_DOWN} />
          <Key label="STO" keyCode={C.STO} />
          <Key label="RCL" keyCode={C.RCL} />
        </div>
        <div className="Keypad--row">
          <Key label="Enter ↑" keyCode={C.ENTER} addClass="Key--bold" />
          <Key label="CHS" keyCode={C.CHS} />
          <Key label="EEX" keyCode={C.EEX} />
          <Key label="CLX" keyCode={C.CLX} />
        </div>
        <div className="Keypad--row">
          <Key label="?" keyCode={C.CONST} addClass="Key--bold" />
          <Key label="7" keyCode={C.D7} addClass="Key--bold" />
          <Key label="8" keyCode={C.D8} addClass="Key--bold" />
          <Key label="9" keyCode={C.D9} addClass="Key--bold" />
          <Key label="÷" keyCode={C.DIV} />
        </div>
        <div className="Keypad--row">
          <Key label="f" keyCode={C.SHIFT_UP} addClass="Key--bold" />
          <Key label="4" keyCode={C.D4} addClass="Key--bold" />
          <Key label="5" keyCode={C.D5} addClass="Key--bold" />
          <Key label="6" keyCode={C.D6} addClass="Key--bold" />
          <Key label="×" keyCode={C.MUL} />
        </div>
        <div className="Keypad--row">
          <Key label="g" keyCode={C.SHIFT_DOWN} addClass="Key--bold" />
          <Key label="1" keyCode={C.D1} addClass="Key--bold" />
          <Key label="2" keyCode={C.D2} addClass="Key--bold" />
          <Key label="3" keyCode={C.D3} addClass="Key--bold" />
          <Key label="-" keyCode={C.SUB} />
        </div>
        <div className="Keypad--row">
          <Key label="C" keyCode={C.CLX} addClass="Key--bold" />
          <Key label="0" keyCode={C.D0} addClass="Key--bold" />
          <Key label="•" keyCode={C.DOT} addClass="Key--bold" />
          <Key label="π" keyCode={C.PI} addClass="Key--bold" />
          <Key label="+" keyCode={C.ADD} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    injectKeyCode,
    setShiftKey,
  }, dispatch)

const mapStateToProps = state => ({
  shiftKey: shiftKeySelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Keypad)