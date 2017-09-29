import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import C from '../processor/keyCodes'
import Key from './Key'
import { setShiftKey, shiftKeySelector } from '../ducks/shiftKey'
import { executeKeyCode } from '../processor/reducer'
import mapKeyboardEvent from '../processor/keyboardEventMapper'
import './Keypad.css'

class Keypad extends React.PureComponent {

  static propTypes = {
    executeKeyCode: PropTypes.func,
    setShiftKey: PropTypes.func.isRequired,
    shiftKey: PropTypes.string
  }

  keyUpHandler = ev => {
    const { shiftKey, setShiftKey, executeKeyCode } = this.props
    ev.preventDefault()
    ev.stopPropagation()
    const keyCode = mapKeyboardEvent(ev)
    if (keyCode) {
      if (shiftKey) {
        setShiftKey(null)
      }
      executeKeyCode(keyCode)
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
          <Key label="LOG" keyCode={C.LOG} labelClass="Key--label-small"/>
          <Key label="LN" keyCode={C.LN} labelClass="Key--label-small"/>
          <Key label="𝑒<sup>𝑥</sup>" topLabel="10<sup>𝑥</sup>" keyCode={C.EXP} />
          <Key label="CLR" keyCode={C.CLR} labelClass="Key--label-small"/>
        </div>
        <div className="Keypad--row">
          <Key label="√𝑥" keyCode={C.SQRT} />
          <Key label="𝑥<sup>2</sup" keyCode={C.SQR} />
          <Key label="SIN" bottomLabel="ASIN" keyCode={C.SIN} labelClass="Key--label-small" />
          <Key label="COS" bottomLabel="ACOS" keyCode={C.COS} labelClass="Key--label-small" />
          <Key label="TAN" bottomLabel="ATAN" keyCode={C.TAN} labelClass="Key--label-small" />
        </div>
        <div className="Keypad--row">
          <Key label="<small>1</small>/𝑥" keyCode={C.RECIPROCAL} />
          <Key label="𝑥↔︎𝑦" keyCode={C.SWAP} />
          <Key label="R↓" keyCode={C.ROLL_DOWN} labelClass="Key--label-small"/>
          <Key label="STO" keyCode={C.STO} labelClass="Key--label-small" />
          <Key label="RCL" keyCode={C.RCL} labelClass="Key--label-small" />
        </div>
        <div className="Keypad--row">
          <Key label="ENTER ↑" keyCode={C.ENTER} labelClass="Key--label-small" />
          <Key label="CHS" keyCode={C.CHS} labelClass="Key--label-small" />
          <Key label="EEX" keyCode={C.EEX} labelClass="Key--label-small" />
          <Key label="CLX" keyCode={C.CLX} labelClass="Key--label-small" />
        </div>
        <div className="Keypad--row">
          <Key label="?" keyCode={C.CONST} labelClass="Key--bold" />
          <Key label="7" keyCode={C.D7} labelClass="Key--bold" />
          <Key label="8" keyCode={C.D8} labelClass="Key--bold" />
          <Key label="9" keyCode={C.D9} labelClass="Key--bold" />
          <Key label="÷" keyCode={C.DIV} />
        </div>
        <div className="Keypad--row">
          <Key label="f" keyCode={C.SHIFT_UP} />
          <Key label="4" keyCode={C.D4} />
          <Key label="5" keyCode={C.D5} />
          <Key label="6" keyCode={C.D6} />
          <Key label="×" keyCode={C.MUL} />
        </div>
        <div className="Keypad--row">
          <Key label="g" keyCode={C.SHIFT_DOWN} />
          <Key label="1" keyCode={C.D1} />
          <Key label="2" keyCode={C.D2} />
          <Key label="3" keyCode={C.D3} />
          <Key label="-" keyCode={C.SUB} />
        </div>
        <div className="Keypad--row">
          <Key label="C" keyCode={C.CLX} />
          <Key label="0" keyCode={C.D0} />
          <Key label="•" keyCode={C.DOT} labelClass="Key--bold" />
          <Key label="π" keyCode={C.PI} />
          <Key label="+" keyCode={C.ADD} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    executeKeyCode,
    setShiftKey,
  }, dispatch)

const mapStateToProps = state => ({
  shiftKey: shiftKeySelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Keypad)