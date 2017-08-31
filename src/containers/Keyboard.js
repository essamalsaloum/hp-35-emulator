import React from 'react'

import keyPress from '../actions/keyPress'
import * as C from '../processor/opCodes'
import Key from '../components/Key'
import './Keyboard.css'

const defaultKeyWidth = 48
const arithKeyWidth = 36
const enterKeyWidth = 108
const inputKeyWidth = 52

export default class Keyboard extends React.PureComponent {

  onClick(opCode) {
    return () => keyPress(opCode)
  }

  render() {
    return (
      <div className="Keyboard">
        <div className="Keyboard--row">
          <Key label="xʸ" width={defaultKeyWidth} onClick={this.onClick(C.POW)} />
          <Key label="LOG" width={defaultKeyWidth} onClick={this.onClick(C.LOG)} />
          <Key label="LN" width={defaultKeyWidth} onClick={this.onClick(C.LN)} />
          <Key label="eˣ" width={defaultKeyWidth} onClick={this.onClick(C.EXP)} />
          <Key label="CLR" width={defaultKeyWidth} onClick={this.onClick(C.CLR)} />
        </div>
        <div className="Keyboard--row">
          <Key label="√x" width={defaultKeyWidth} onClick={this.onClick(C.SQRT)} />
          <Key label="ARC" width={defaultKeyWidth} onClick={this.onClick(C.ARC)} />
          <Key label="SIN" width={defaultKeyWidth} onClick={this.onClick(C.SIN)} />
          <Key label="COS" width={defaultKeyWidth} onClick={this.onClick(C.COS)} />
          <Key label="TAN" width={defaultKeyWidth} onClick={this.onClick(C.TAN)} />
        </div>
        <div className="Keyboard--row">
          <Key label="¹/x" width={defaultKeyWidth} onClick={this.onClick(C.RECIPROCAL)} />
          <Key label="x↔︎y" width={defaultKeyWidth} onClick={this.onClick(C.SWAP)} />
          <Key label="R↓" width={defaultKeyWidth} onClick={this.onClick(C.ROLL_DOWN)} />
          <Key label="STO" width={defaultKeyWidth} onClick={this.onClick(C.STO)} />
          <Key label="RCL" width={defaultKeyWidth} onClick={this.onClick(C.RCL)} />
        </div>
        <div className="Keyboard--row">
          <Key label="Enter ↑" width={enterKeyWidth} onClick={this.onClick(C.ENTER)} />
          <Key label="CHS" width={defaultKeyWidth} onClick={this.onClick(C.CHS)} />
          <Key label="EEX" width={defaultKeyWidth} onClick={this.onClick(C.EEX)} />
          <Key label="CLX" width={defaultKeyWidth} onClick={this.onClick(C.CLX)} />
        </div>
        <div className="Keyboard--row">
          <Key label="-" width={arithKeyWidth} onClick={this.onClick(C.SUB)} />
          <Key label="7" width={inputKeyWidth} onClick={this.onClick(C.DIGIT_7)} />
          <Key label="8" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_8)} />
          <Key label="9" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_9)} />
        </div>
        <div className="Keyboard--row">
          <Key label="+" width={arithKeyWidth}onClick={this.onClick(C.ADD)} />
          <Key label="4" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_4)} />
          <Key label="5" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_5)} />
          <Key label="6" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_6)} />
        </div>
        <div className="Keyboard--row">
          <Key label="×" width={arithKeyWidth}onClick={this.onClick(C.MUL)} />
          <Key label="1" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_1)} />
          <Key label="2" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_2)} />
          <Key label="3" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_3)} />
        </div>
        <div className="Keyboard--row">
          <Key label="÷" width={arithKeyWidth}onClick={this.onClick(C.DIV)} />
          <Key label="0" width={inputKeyWidth}onClick={this.onClick(C.DIGIT_0)} />
          <Key label="•" width={inputKeyWidth}onClick={this.onClick(C.DECIMAL)} />
          <Key label="π" width={inputKeyWidth}onClick={this.onClick(C.PI)} />
        </div>
      </div>
    )
  }
}
