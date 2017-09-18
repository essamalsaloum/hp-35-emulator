import React from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import { execute } from '../processor'
import mapKeyboardEvent from '../processor/keyboardEventMapper'
import C from '../processor/keyCodes'
import Key from '../components/Key'
import theme from '../theme'
import './Keypad.css'

const inputKeyWidth = 48
const enterKeyWidth = 110

const shiftKeyModifiers = {
  [C.EXP]: { [C.SHIFT_UP]: C.ALOG },
  [C.SIN]: { [C.SHIFT_DOWN]: C.ASIN },
  [C.COS]: { [C.SHIFT_DOWN]: C.ACOS },
  [C.TAN]: { [C.SHIFT_DOWN]: C.ATAN },
}

const shiftTopKeyStyle = { color: theme.topLabelColor }
const shiftBottomKeyStyle = { color: theme.bottomLabelColor }
const boldKeyStyle = { fontWeight: 'bold' }

export default class Keypad extends React.PureComponent {

  static propTypes = {
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => undefined
  }

  state = {}

  componentWillMount() {
    this.subscription = store.subscribe(({ shiftKey }) => {
      this.setState({ shiftKey })
    })
  }

  componentDidMount() {
    const elem = document.querySelector('.App--main')
    if (elem) {
      elem.addEventListener('keyup', ev => {
        ev.preventDefault()
        const keyCode = mapKeyboardEvent(ev)
        if (keyCode) {
          store.setState(execute(store.getState(), keyCode))
        }
      })
    }
  }

  componentWillUnmount() {
    this.subscription.remove()
  }

  onClick(keyCode) {
    const { shiftKey } = this.state
    if (keyCode === C.SHIFT_UP) {
      store.setState({ shiftKey: shiftKey === C.SHIFT_UP ? null : C.SHIFT_UP })
    }
    else if (keyCode === C.SHIFT_DOWN) {
      store.setState({ shiftKey: shiftKey === C.SHIFT_DOWN ? null : C.SHIFT_DOWN })
    } else {
      const keyMap = shiftKeyModifiers[keyCode]
      keyCode = (keyMap && keyMap[shiftKey]) || keyCode
      const newState = execute(store.getState(), keyCode)
      store.setState({ ...newState, shiftKey: null })
    }
  }

  render() {
    return (
      <div className="Keypad">
        <div className="Keypad--row">
          <Key label="y<sup>x</sup>" width={inputKeyWidth} onClick={() => this.onClick(C.POW)} />
          <Key label="LOG" width={inputKeyWidth} onClick={() => this.onClick(C.LOG)} />
          <Key label="LN" width={inputKeyWidth} onClick={() => this.onClick(C.LN)} />
          <Key label="e<sup>x</sup>" topLabel="10<sup>x</sup>" width={inputKeyWidth} onClick={() => this.onClick(C.EXP)} />
          <Key label="CLR" width={inputKeyWidth} onClick={() => this.onClick(C.CLR)} />
        </div>
        <div className="Keypad--row">
          <Key label="√x" width={inputKeyWidth} onClick={() => this.onClick(C.SQRT)} />
          <Key label="x<sup>2</sup>" width={inputKeyWidth} onClick={() => this.onClick(C.SQR)} />
          <Key label="SIN" bottomLabel="ASIN" width={inputKeyWidth} onClick={() => this.onClick(C.SIN)} />
          <Key label="COS" bottomLabel="ACOS" width={inputKeyWidth} onClick={() => this.onClick(C.COS)} />
          <Key label="TAN" bottomLabel="ATAN" width={inputKeyWidth} onClick={() => this.onClick(C.TAN)} />
        </div>
        <div className="Keypad--row">
          <Key label="1/x" width={inputKeyWidth} onClick={() => this.onClick(C.RECIPROCAL)} />
          <Key label="x↔︎y" width={inputKeyWidth} onClick={() => this.onClick(C.SWAP)} />
          <Key label="R↓" width={inputKeyWidth} onClick={() => this.onClick(C.ROLL_DOWN)} />
          <Key label="STO" width={inputKeyWidth} onClick={() => this.onClick(C.STO)} />
          <Key label="RCL" width={inputKeyWidth} onClick={() => this.onClick(C.RCL)} />
        </div>
        <div className="Keypad--row">
          <Key label="Enter ↑" width={enterKeyWidth} onClick={() => this.onClick(C.ENTER)} />
          <Key label="CHS" width={inputKeyWidth} onClick={() => this.onClick(C.CHS)} />
          <Key label="EEX" width={inputKeyWidth} onClick={() => this.onClick(C.EEX)} />
          <Key label="CLX" width={inputKeyWidth} onClick={() => this.onClick(C.CLX)} />
        </div>
        <div className="Keypad--row">
          <Key label="C" width={inputKeyWidth} onClick={() => this.onClick(C.CLX)} style={boldKeyStyle} />
          <Key label="7" width={inputKeyWidth} onClick={() => this.onClick(C.D7)} style={boldKeyStyle} />
          <Key label="8" width={inputKeyWidth} onClick={() => this.onClick(C.D8)} style={boldKeyStyle} />
          <Key label="9" width={inputKeyWidth} onClick={() => this.onClick(C.D9)} style={boldKeyStyle} />
          <Key label="÷" width={inputKeyWidth} onClick={() => this.onClick(C.DIV)} style={boldKeyStyle} />
        </div>
        <div className="Keypad--row">
          <Key label="f" width={inputKeyWidth} onClick={() => this.onClick(C.SHIFT_UP)} style={{ ...boldKeyStyle, ...shiftTopKeyStyle }} />
          <Key label="4" width={inputKeyWidth} onClick={() => this.onClick(C.D4)} style={boldKeyStyle} />
          <Key label="5" width={inputKeyWidth} onClick={() => this.onClick(C.D5)} style={boldKeyStyle} />
          <Key label="6" width={inputKeyWidth} onClick={() => this.onClick(C.D6)} style={boldKeyStyle} />
          <Key label="×" width={inputKeyWidth} onClick={() => this.onClick(C.MUL)} style={boldKeyStyle} />
        </div>
        <div className="Keypad--row">
          <Key label="g" width={inputKeyWidth} onClick={() => this.onClick(C.SHIFT_DOWN)} style={{ ...boldKeyStyle, ...shiftBottomKeyStyle }} />
          <Key label="1" width={inputKeyWidth} onClick={() => this.onClick(C.D1)} style={boldKeyStyle} />
          <Key label="2" width={inputKeyWidth} onClick={() => this.onClick(C.D2)} style={boldKeyStyle} />
          <Key label="3" width={inputKeyWidth} onClick={() => this.onClick(C.D3)} style={boldKeyStyle} />
          <Key label="-" width={inputKeyWidth} onClick={() => this.onClick(C.SUB)} style={boldKeyStyle} />
        </div>
        <div className="Keypad--row">
          <Key label="C" width={inputKeyWidth} onClick={() => this.onClick(C.CLX)} />
          <Key label="0" width={inputKeyWidth} onClick={() => this.onClick(C.D0)} style={boldKeyStyle} />
          <Key label="•" width={inputKeyWidth} onClick={() => this.onClick(C.DOT)} style={boldKeyStyle} />
          <Key label="π" width={inputKeyWidth} onClick={() => this.onClick(C.PI)} style={boldKeyStyle} />
          <Key label="+" width={inputKeyWidth} onClick={() => this.onClick(C.ADD)} style={boldKeyStyle} />
        </div>
      </div>
    )
  }
}
