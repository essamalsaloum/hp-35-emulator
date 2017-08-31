import React from 'react'
import PropTypes from 'prop-types'

import store from '../store'
import execute from '../processor/operations/executor'
import * as C from '../processor/opCodes'
import Key from '../components/Key'
import './Keyboard.css'

const defaultKeyWidth = 48
const arithKeyWidth = 36
const enterKeyWidth = 108
const inputKeyWidth = 52

export default class Keyboard extends React.PureComponent {

  static propTypes = {
    keyPress: PropTypes.func
  }

  static defaultProps = {
    keyPress: () => undefined
  }

  keyPress(opCode) {
    return () => store.setState(execute(opCode)(store.getState()))
  }

  render() {
    return (
      <div className="Keyboard">
        <div className="Keyboard--row">
          <Key label="xʸ" width={defaultKeyWidth} keyPress={this.keyPress(C.POW)} />
          <Key label="LOG" width={defaultKeyWidth} keyPress={this.keyPress(C.LOG)} />
          <Key label="LN" width={defaultKeyWidth} keyPress={this.keyPress(C.LN)} />
          <Key label="eˣ" width={defaultKeyWidth} keyPress={this.keyPress(C.EXP)} />
          <Key label="CLR" width={defaultKeyWidth} keyPress={this.keyPress(C.CLR)} />
        </div>
        <div className="Keyboard--row">
          <Key label="√x" width={defaultKeyWidth} keyPress={this.keyPress(C.SQRT)} />
          <Key label="ARC" width={defaultKeyWidth} keyPress={this.keyPress(C.ARC)} />
          <Key label="SIN" width={defaultKeyWidth} keyPress={this.keyPress(C.SIN)} />
          <Key label="COS" width={defaultKeyWidth} keyPress={this.keyPress(C.COS)} />
          <Key label="TAN" width={defaultKeyWidth} keyPress={this.keyPress(C.TAN)} />
        </div>
        <div className="Keyboard--row">
          <Key label="¹/x" width={defaultKeyWidth} keyPress={this.keyPress(C.RECIPROCAL)} />
          <Key label="x↔︎y" width={defaultKeyWidth} keyPress={this.keyPress(C.SWAP)} />
          <Key label="R↓" width={defaultKeyWidth} keyPress={this.keyPress(C.ROLL_DOWN)} />
          <Key label="STO" width={defaultKeyWidth} keyPress={this.keyPress(C.STO)} />
          <Key label="RCL" width={defaultKeyWidth} keyPress={this.keyPress(C.RCL)} />
        </div>
        <div className="Keyboard--row">
          <Key label="Enter ↑" width={enterKeyWidth} keyPress={this.keyPress(C.ENTER)} />
          <Key label="CHS" width={defaultKeyWidth} keyPress={this.keyPress(C.CHS)} />
          <Key label="EEX" width={defaultKeyWidth} keyPress={this.keyPress(C.EEX)} />
          <Key label="CLX" width={defaultKeyWidth} keyPress={this.keyPress(C.CLX)} />
        </div>
        <div className="Keyboard--row">
          <Key label="-" width={arithKeyWidth} keyPress={this.keyPress(C.SUB)} />
          <Key label="7" width={inputKeyWidth} keyPress={this.keyPress(C.DIGIT_7)} />
          <Key label="8" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_8)} />
          <Key label="9" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_9)} />
        </div>
        <div className="Keyboard--row">
          <Key label="+" width={arithKeyWidth}keyPress={this.keyPress(C.ADD)} />
          <Key label="4" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_4)} />
          <Key label="5" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_5)} />
          <Key label="6" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_6)} />
        </div>
        <div className="Keyboard--row">
          <Key label="×" width={arithKeyWidth}keyPress={this.keyPress(C.MUL)} />
          <Key label="1" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_1)} />
          <Key label="2" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_2)} />
          <Key label="3" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_3)} />
        </div>
        <div className="Keyboard--row">
          <Key label="÷" width={arithKeyWidth}keyPress={this.keyPress(C.DIV)} />
          <Key label="0" width={inputKeyWidth}keyPress={this.keyPress(C.DIGIT_0)} />
          <Key label="•" width={inputKeyWidth}keyPress={this.keyPress(C.DECIMAL)} />
          <Key label="π" width={inputKeyWidth}keyPress={this.keyPress(C.PI)} />
        </div>
      </div>
    )
  }
}
