import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import C from '../processor/opcodes'
import Key from './Key'
import { setShiftKey, shiftKeySelector } from '../ducks/shiftKey'
import { executeInstruction } from '../processor/reducer'
import mapKeyboardEvent from '../processor/keyboardEventMapper'
import './Keypad.css'

class Keypad extends React.PureComponent {

  static propTypes = {
    executeInstruction: PropTypes.func,
    setShiftKey: PropTypes.func.isRequired,
    shiftKey: PropTypes.string
  }

  keyUpHandler = ev => {
    const { shiftKey, setShiftKey, executeInstruction } = this.props
    ev.preventDefault()
    ev.stopPropagation()
    const opcode = mapKeyboardEvent(ev)
    if (opcode) {
      if (shiftKey) {
        setShiftKey(null)
      }
      executeInstruction(opcode)
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
          <Key label="y<sup>x</sup>" opcode={C.POW} />
          <Key label="LOG" opcode={C.LOG} labelClass="Key--label-small"/>
          <Key label="LN" opcode={C.LN} labelClass="Key--label-small"/>
          <Key label="e<sup>x</sup>" topLabel="10<sup>x</sup>" opcode={C.EXP} />
          <Key label="CLR" opcode={C.CLR} labelClass="Key--label-small"/>
        </div>
        <div className="Keypad--row">
          <Key label="√x" opcode={C.SQRT} />
          <Key label="x<sup>2</sup" opcode={C.SQR} />
          <Key label="SIN" bottomLabel="ASIN" opcode={C.SIN} labelClass="Key--label-small" />
          <Key label="COS" bottomLabel="ACOS" opcode={C.COS} labelClass="Key--label-small" />
          <Key label="TAN" bottomLabel="ATAN" opcode={C.TAN} labelClass="Key--label-small" />
        </div>
        <div className="Keypad--row">
          <Key label="<small>1</small>/x" opcode={C.RECIPROCAL} />
          <Key label="x↔︎y" opcode={C.SWAP} />
          <Key label="R↓" opcode={C.ROLL_DOWN} labelClass="Key--label-small"/>
          <Key label="STO" opcode={C.STO} labelClass="Key--label-small" />
          <Key label="RCL" opcode={C.RCL} labelClass="Key--label-small" />
        </div>
        <div className="Keypad--row">
          <Key label="ENTER ↑" opcode={C.ENTER} labelClass="Key--label-small" />
          <Key label="CHS" opcode={C.CHS} labelClass="Key--label-small" />
          <Key label="EEX" opcode={C.EEX} labelClass="Key--label-small" />
          <Key label="CLX" opcode={C.CLX} labelClass="Key--label-small" />
        </div>
        <div className="Keypad--row">
          <Key label="?" opcode={C.CONST} labelClass="Key--bold" />
          <Key label="7" opcode={C.D7} labelClass="Key--bold" />
          <Key label="8" opcode={C.D8} labelClass="Key--bold" />
          <Key label="9" opcode={C.D9} labelClass="Key--bold" />
          <Key label="÷" opcode={C.DIV} />
        </div>
        <div className="Keypad--row">
          <Key label="f" opcode={C.SHIFT_UP} />
          <Key label="4" opcode={C.D4} />
          <Key label="5" opcode={C.D5} />
          <Key label="6" opcode={C.D6} />
          <Key label="×" opcode={C.MUL} />
        </div>
        <div className="Keypad--row">
          <Key label="g" opcode={C.SHIFT_DOWN} />
          <Key label="1" opcode={C.D1} />
          <Key label="2" opcode={C.D2} />
          <Key label="3" opcode={C.D3} />
          <Key label="-" opcode={C.SUB} />
        </div>
        <div className="Keypad--row">
          <Key label="C" opcode={C.CLX} />
          <Key label="0" opcode={C.D0} />
          <Key label="•" opcode={C.DOT} labelClass="Key--bold" />
          <Key label="π" opcode={C.PI} />
          <Key label="+" opcode={C.ADD} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    executeInstruction,
    setShiftKey,
  }, dispatch)

const mapStateToProps = state => ({
  shiftKey: shiftKeySelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Keypad)