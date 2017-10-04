import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import C from '../cpu/keyCodes'
import Key from './Key'
import { setShiftKey, shiftKeySelector } from '../ducks/shiftKey'
import { executeKeyCode } from '../cpu/reducer'
import mapKeyboardEvent from '../cpu/keyboardEventMapper'
import './Keypad.css'

class Keypad extends React.PureComponent {

  state = {
    shiftKey: null
  }

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
          <Key keyCode={C.POW} shiftCodes={{ [C.STO]: C.STO_A, [C.RCL]: C.RCL_A }} />
          <Key keyCode={C.LOG} shiftCodes={{ [C.STO]: C.STO_B, [C.RCL]: C.RCL_B }} />
          <Key keyCode={C.LN} shiftCodes={{ [C.STO]: C.STO_C, [C.RCL]: C.RCL_C }} />
          <Key keyCode={C.EXP} shiftCodes={{ [C.SHIFT_UP]: C.ALOG, [C.STO]: C.STO_D, [C.RCL]: C.RCL_D }} />
          <Key keyCode={C.CLR} shiftCodes={{ [C.STO]: C.STO_E, [C.RCL]: C.RCL_E }} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.SQRT} shiftCodes={{ [C.STO]: C.STO_F, [C.RCL]: C.RCL_F }} />
          <Key keyCode={C.SQR} shiftCodes={{ [C.STO]: C.STO_G, [C.RCL]: C.RCL_G }} />
          <Key keyCode={C.SIN} shiftCodes={{ [C.SHIFT_DOWN]: C.ASIN, [C.STO]: C.STO_H, [C.RCL]: C.RCL_H }} />
          <Key keyCode={C.COS} shiftCodes={{ [C.SHIFT_DOWN]: C.ACOS, [C.STO]: C.STO_I, [C.RCL]: C.RCL_I }} />
          <Key keyCode={C.TAN} shiftCodes={{ [C.SHIFT_DOWN]: C.ATAN, [C.STO]: C.STO_J, [C.RCL]: C.RCL_J }} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.SWAP} shiftCodes={{ [C.STO]: C.STO_K, [C.RCL]: C.RCL_K }} />
          <Key keyCode={C.ROLL_DOWN} shiftCodes={{ [C.STO]: C.STO_L, [C.RCL]: C.RCL_L }} />
          <Key keyCode={C.INV} shiftCodes={{ [C.STO]: C.STO_M, [C.RCL]: C.RCL_M }} />
          <Key keyCode={C.FACT} shiftCodes={{ [C.SHIFT_UP]: C.NCR, [C.SHIFT_DOWN]: C.NPR, [C.STO]: C.STO_N, [C.RCL]: C.RCL_N }} />
          <Key keyCode={C.PCT} shiftCodes={{ [C.SHIFT_DOWN]: C.PCTCHG, [C.STO]: C.STO_O, [C.RCL]: C.RCL_O }} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.ENTER} />
          <Key keyCode={C.CHS} shiftCodes={{ [C.STO]: C.STO_P, [C.RCL]: C.RCL_P }} />
          <Key keyCode={C.EEX} shiftCodes={{ [C.STO]: C.STO_Q, [C.RCL]: C.RCL_Q }} />
          <Key keyCode={C.CLX} shiftCodes={{ [C.STO]: C.STO_R, [C.RCL]: C.RCL_R }} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.MEM} shiftCodes={{[C.SHIFT_DOWN]: C.CONST}}/>
          <Key keyCode={C.D7} />
          <Key keyCode={C.D8} shiftCodes={{ [C.STO]: C.STO_S, [C.RCL]: C.RCL_S }} />
          <Key keyCode={C.D9} shiftCodes={{ [C.STO]: C.STO_T, [C.RCL]: C.RCL_T }} />
          <Key keyCode={C.DIV} shiftCodes={{ [C.STO]: C.STO_U, [C.RCL]: C.RCL_U }} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.SHIFT_UP} />
          <Key keyCode={C.D4} />
          <Key keyCode={C.D5} shiftCodes={{ [C.STO]: C.STO_V, [C.RCL]: C.RCL_V }} />
          <Key keyCode={C.D6} shiftCodes={{ [C.STO]: C.STO_W, [C.RCL]: C.RCL_W }} />
          <Key keyCode={C.MUL} shiftCodes={{ [C.STO]: C.STO_X, [C.RCL]: C.RCL_X }} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.SHIFT_DOWN} />
          <Key keyCode={C.D1} />
          <Key keyCode={C.D2} shiftCodes={{ [C.STO]: C.STO_Y, [C.RCL]: C.RCL_Y }} />
          <Key keyCode={C.D3} shiftCodes={{ [C.STO]: C.STO_Z, [C.RCL]: C.RCL_Z }} />
          <Key keyCode={C.SUB} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.CANCEL} />
          <Key keyCode={C.D0} />
          <Key keyCode={C.DOT} />
          <Key keyCode={C.PI} />
          <Key keyCode={C.ADD} />
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