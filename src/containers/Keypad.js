import React from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import { execute } from '../processor'
import mapKeyboardEvent from '../processor/keyboardEventMapper'
import C from '../processor/keyCodes'
import Key from '../components/Key'
import theme from '../theme'

const inputKeyWidth = 48
const enterKeyWidth = 110

const styles = {
  keypad: {
    borderRadius: 4,
    backgroundColor: theme.keypadBackgroundColor,
    padding: 8
  },
  keypadRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '8px 0'
  }
}

const shiftKeyModifiers = {
  [C.EXP]: { [C.SHIFT_UP]: C.ALOG },
  [C.SIN]: { [C.SHIFT_DOWN]: C.ASIN },
  [C.COS]: { [C.SHIFT_DOWN]: C.ACOS },
  [C.TAN]: { [C.SHIFT_DOWN]: C.ATAN },
}

const shiftUpKeyStyle = { color: theme.keypadShiftUpColor }
const shiftDownKeyStyle = { color: theme.shiftDownColor }
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
    this.subscription = store.subscribe(({ keypad }) => {
      this.setState(keypad)
    })
  }

  componentDidMount() {
    const elem = document.querySelector('.App--main')
    if (elem) {
      elem.addEventListener('keyup', ev => {
        ev.preventDefault()
        const keyCode = mapKeyboardEvent(ev)
        if (keyCode) {
          const newProcessorState = execute(store.getState().processor, keyCode)
          store.setState({ processor: newProcessorState })
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
      store.setState({ keypad: { shiftKey: shiftKey === C.SHIFT_UP ? null : C.SHIFT_UP } })
    }
    else if (keyCode === C.SHIFT_DOWN) {
      store.setState({ keypad: { shiftKey: shiftKey === C.SHIFT_DOWN ? null : C.SHIFT_DOWN } })
    } else {
      const keyMap = shiftKeyModifiers[keyCode]
      keyCode = (keyMap && keyMap[shiftKey]) || keyCode
      const newState = execute(store.getState().processor, keyCode)
      store.setState({
        processor: {
          ...newState
        },
        keypad: {
          shiftKey: null
        }
      })
    }
  }

  render() {
    return (
      <div style={styles.keypad}>
        <div style={styles.keypadRow}>
          <Key label="y<sup>x</sup>" width={inputKeyWidth} onClick={() => this.onClick(C.POW)} />
          <Key label="LOG" width={inputKeyWidth} onClick={() => this.onClick(C.LOG)} />
          <Key label="LN" width={inputKeyWidth} onClick={() => this.onClick(C.LN)} />
          <Key label="e<sup>x</sup>" topLabel="10<sup>x</sup>" width={inputKeyWidth} onClick={() => this.onClick(C.EXP)} />
          <Key label="CLR" width={inputKeyWidth} onClick={() => this.onClick(C.CLR)} />
        </div>
        <div style={styles.keypadRow}>
          <Key label="√x" width={inputKeyWidth} onClick={() => this.onClick(C.SQRT)} />
          <Key label="x<sup>2</sup>" width={inputKeyWidth} onClick={() => this.onClick(C.SQR)} />
          <Key label="SIN" bottomLabel="ASIN" width={inputKeyWidth} onClick={() => this.onClick(C.SIN)} />
          <Key label="COS" bottomLabel="ACOS" width={inputKeyWidth} onClick={() => this.onClick(C.COS)} />
          <Key label="TAN" bottomLabel="ATAN" width={inputKeyWidth} onClick={() => this.onClick(C.TAN)} />
        </div>
        <div style={styles.keypadRow}>
          <Key label="1/x" width={inputKeyWidth} onClick={() => this.onClick(C.RECIPROCAL)} />
          <Key label="x↔︎y" width={inputKeyWidth} onClick={() => this.onClick(C.SWAP)} />
          <Key label="R↓" width={inputKeyWidth} onClick={() => this.onClick(C.ROLL_DOWN)} />
          <Key label="STO" width={inputKeyWidth} onClick={() => this.onClick(C.STO)} />
          <Key label="RCL" width={inputKeyWidth} onClick={() => this.onClick(C.RCL)} />
        </div>
        <div style={styles.keypadRow}>
          <Key label="Enter ↑" width={enterKeyWidth} onClick={() => this.onClick(C.ENTER)} />
          <Key label="CHS" width={inputKeyWidth} onClick={() => this.onClick(C.CHS)} />
          <Key label="EEX" width={inputKeyWidth} onClick={() => this.onClick(C.EEX)} />
          <Key label="CLX" width={inputKeyWidth} onClick={() => this.onClick(C.CLX)} />
        </div>
        <div style={styles.keypadRow}>
          <Key label="C" width={inputKeyWidth} onClick={() => this.onClick(C.CLX)} style={boldKeyStyle} />
          <Key label="7" width={inputKeyWidth} onClick={() => this.onClick(C.D7)} style={boldKeyStyle} />
          <Key label="8" width={inputKeyWidth} onClick={() => this.onClick(C.D8)} style={boldKeyStyle} />
          <Key label="9" width={inputKeyWidth} onClick={() => this.onClick(C.D9)} style={boldKeyStyle} />
          <Key label="÷" width={inputKeyWidth} onClick={() => this.onClick(C.DIV)} style={boldKeyStyle} />
        </div>
        <div style={styles.keypadRow}>
          <Key label="f" width={inputKeyWidth} onClick={() => this.onClick(C.SHIFT_UP)} style={{ ...boldKeyStyle, ...shiftUpKeyStyle }} />
          <Key label="4" width={inputKeyWidth} onClick={() => this.onClick(C.D4)} style={boldKeyStyle} />
          <Key label="5" width={inputKeyWidth} onClick={() => this.onClick(C.D5)} style={boldKeyStyle} />
          <Key label="6" width={inputKeyWidth} onClick={() => this.onClick(C.D6)} style={boldKeyStyle} />
          <Key label="×" width={inputKeyWidth} onClick={() => this.onClick(C.MUL)} style={boldKeyStyle} />
        </div>
        <div style={styles.keypadRow}>
          <Key label="g" width={inputKeyWidth} onClick={() => this.onClick(C.SHIFT_DOWN)} style={{ ...boldKeyStyle, ...shiftDownKeyStyle }} />
          <Key label="1" width={inputKeyWidth} onClick={() => this.onClick(C.D1)} style={boldKeyStyle} />
          <Key label="2" width={inputKeyWidth} onClick={() => this.onClick(C.D2)} style={boldKeyStyle} />
          <Key label="3" width={inputKeyWidth} onClick={() => this.onClick(C.D3)} style={boldKeyStyle} />
          <Key label="-" width={inputKeyWidth} onClick={() => this.onClick(C.SUB)} style={boldKeyStyle} />
        </div>
        <div style={styles.keypadRow}>
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
