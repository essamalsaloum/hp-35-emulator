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
    shiftKey:  null
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
          <Key keyCode={C.POW} />
          <Key keyCode={C.LOG} />
          <Key keyCode={C.LN} />
          <Key keyCode={C.EXP} />
          <Key keyCode={C.CLR} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.SQRT} />
          <Key keyCode={C.SQR} />
          <Key keyCode={C.SIN} />
          <Key keyCode={C.COS} />
          <Key keyCode={C.TAN}  />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.INV} />
          <Key keyCode={C.SWAP} />
          <Key keyCode={C.ROLL_DOWN}/>
          <Key keyCode={C.STO} />
          <Key keyCode={C.RCL} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.ENTER} />
          <Key keyCode={C.CHS} />
          <Key keyCode={C.EEX} />
          <Key keyCode={C.CLX} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.HELP} />
          <Key keyCode={C.D7} />
          <Key keyCode={C.D8} />
          <Key keyCode={C.D9} />
          <Key keyCode={C.DIV} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.SHIFT_UP} />
          <Key keyCode={C.D4} />
          <Key keyCode={C.D5} />
          <Key keyCode={C.D6} />
          <Key keyCode={C.MUL} />
        </div>
        <div className="Keypad--row">
          <Key keyCode={C.SHIFT_DOWN} />
          <Key keyCode={C.D1} />
          <Key keyCode={C.D2} />
          <Key keyCode={C.D3} />
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