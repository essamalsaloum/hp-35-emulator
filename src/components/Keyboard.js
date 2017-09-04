import React from 'react'
import PropTypes from 'prop-types'

import * as C from '../processor/keyCodes'
import Key from './Key'
import './Keyboard.css'

const defaultKeyWidth = 48
const arithKeyWidth = 36
const enterKeyWidth = 110
const inputKeyWidth = 52

export default function Keyboard({onClick}) {
    return (
      <div className="Keyboard">
        <div className="Keyboard--row">
          <Key label="xʸ" width={defaultKeyWidth} onClick={onClick(C.POW)} />
          <Key label="LOG" width={defaultKeyWidth} onClick={onClick(C.LOG)} />
          <Key label="LN" width={defaultKeyWidth} onClick={onClick(C.LN)} />
          <Key label="eˣ" width={defaultKeyWidth} onClick={onClick(C.EXP)} />
          <Key label="CLR" width={defaultKeyWidth} onClick={onClick(C.CLR)} />
        </div>
        <div className="Keyboard--row">
          <Key label="√x" width={defaultKeyWidth} onClick={onClick(C.SQRT)} />
          <Key label="ARC" width={defaultKeyWidth} onClick={onClick(C.ARC)} />
          <Key label="SIN" width={defaultKeyWidth} onClick={onClick(C.SIN)} />
          <Key label="COS" width={defaultKeyWidth} onClick={onClick(C.COS)} />
          <Key label="TAN" width={defaultKeyWidth} onClick={onClick(C.TAN)} />
        </div>
        <div className="Keyboard--row">
          <Key label="¹/x" width={defaultKeyWidth} onClick={onClick(C.RECIPROCAL)} />
          <Key label="x↔︎y" width={defaultKeyWidth} onClick={onClick(C.SWAP)} />
          <Key label="R↓" width={defaultKeyWidth} onClick={onClick(C.ROLL_DOWN)} />
          <Key label="STO" width={defaultKeyWidth} onClick={onClick(C.STO)} />
          <Key label="RCL" width={defaultKeyWidth} onClick={onClick(C.RCL)} />
        </div>
        <div className="Keyboard--row">
          <Key label="Enter ↑" width={enterKeyWidth} onClick={onClick(C.ENTER)} />
          <Key label="CHS" width={defaultKeyWidth} onClick={onClick(C.CHS)} />
          <Key label="EEX" width={defaultKeyWidth} onClick={onClick(C.EEX)} />
          <Key label="CLX" width={defaultKeyWidth} onClick={onClick(C.CLX)} />
        </div>
        <div className="Keyboard--row">
          <Key label="-" width={arithKeyWidth} onClick={onClick(C.SUB)} />
          <Key label="7" width={inputKeyWidth} onClick={onClick(C.DIGIT_7)} />
          <Key label="8" width={inputKeyWidth} onClick={onClick(C.DIGIT_8)} />
          <Key label="9" width={inputKeyWidth} onClick={onClick(C.DIGIT_9)} />
        </div>
        <div className="Keyboard--row">
          <Key label="+" width={arithKeyWidth} onClick={onClick(C.ADD)} />
          <Key label="4" width={inputKeyWidth} onClick={onClick(C.DIGIT_4)} />
          <Key label="5" width={inputKeyWidth} onClick={onClick(C.DIGIT_5)} />
          <Key label="6" width={inputKeyWidth} onClick={onClick(C.DIGIT_6)} />
        </div>
        <div className="Keyboard--row">
          <Key label="×" width={arithKeyWidth} onClick={onClick(C.MUL)} />
          <Key label="1" width={inputKeyWidth} onClick={onClick(C.DIGIT_1)} />
          <Key label="2" width={inputKeyWidth} onClick={onClick(C.DIGIT_2)} />
          <Key label="3" width={inputKeyWidth} onClick={onClick(C.DIGIT_3)} />
        </div>
        <div className="Keyboard--row">
          <Key label="÷" width={arithKeyWidth} onClick={onClick(C.DIV)} />
          <Key label="0" width={inputKeyWidth} onClick={onClick(C.DIGIT_0)} />
          <Key label="•" width={inputKeyWidth} onClick={onClick(C.DECIMAL)} />
          <Key label="π" width={inputKeyWidth} onClick={onClick(C.PI)} />
        </div>
      </div>
    )
}

Keyboard.propTypes = {
  onClick: PropTypes.func
}

Keyboard.defaultProps = {
  onClick: () => undefined
}