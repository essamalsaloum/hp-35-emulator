import React from 'react'
import C from '../processor/keyCodes'
import Key from './Key'
import './Keypad.css'

export default class Keypad extends React.PureComponent {
  render() {
    return (
      <div className="Keypad">
        <div className="Keypad--row">
          <Key label="y<sup>x</sup>" keyCode={C.POW} />
          <Key label="LOG" keyCode={C.LOG} />
          <Key label="LN" keyCode={C.LN} />
          <Key label="e<sup>x</sup>" topLabel="10<sup>𝑥</sup>" keyCode={C.EXP} />
          <Key label="CLR" keyCode={C.CLR} />
        </div>
        <div className="Keypad--row">
          <Key label="√x" keyCode={C.SQRT} />
          <Key label="x<sup>2</sup>" keyCode={C.SQR} />
          <Key label="SIN" bottomLabel="ASIN" keyCode={C.SIN} />
          <Key label="COS" bottomLabel="ACOS" keyCode={C.COS} />
          <Key label="TAN" bottomLabel="ATAN" keyCode={C.TAN} />
        </div>
        <div className="Keypad--row">
          <Key label="1/x" keyCode={C.RECIPROCAL} />
          <Key label="x↔︎y" keyCode={C.SWAP} />
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
          <Key label="Const" keyCode={C.CONST} />
          <Key label="7" keyCode={C.D7} addClass="Key--bold" />
          <Key label="8" keyCode={C.D8} addClass="Key--bold" />
          <Key label="9" keyCode={C.D9} addClass="Key--bold" />
          <Key label="÷" keyCode={C.DIV} addClass="Key--bold" />
        </div>
        <div className="Keypad--row">
          <Key label="f" keyCode={C.SHIFT_UP} addClass="Key--bold" />
          <Key label="4" keyCode={C.D4} addClass="Key--bold" />
          <Key label="5" keyCode={C.D5} addClass="Key--bold" />
          <Key label="6" keyCode={C.D6} addClass="Key--bold" />
          <Key label="×" keyCode={C.MUL} addClass="Key--bold" />
        </div>
        <div className="Keypad--row">
          <Key label="g" keyCode={C.SHIFT_DOWN} addClass="Key--bold" />
          <Key label="1" keyCode={C.D1} addClass="Key--bold" />
          <Key label="2" keyCode={C.D2} addClass="Key--bold" />
          <Key label="3" keyCode={C.D3} addClass="Key--bold" />
          <Key label="-" keyCode={C.SUB} addClass="Key--bold" />
        </div>
        <div className="Keypad--row">
          <Key label="C" keyCode={C.CLX} addClass="Key--bold" />
          <Key label="0" keyCode={C.D0} addClass="Key--bold" />
          <Key label="•" keyCode={C.DOT} addClass="Key--bold" />
          <Key label="π" keyCode={C.PI} addClass="Key--bold" />
          <Key label="+" keyCode={C.ADD} addClass="Key--bold" />
        </div>
      </div>
    )
  }
}
