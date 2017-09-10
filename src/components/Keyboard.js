import React from 'react'
import PropTypes from 'prop-types'

import * as A from '../processor/actionCodes'
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
          <Key label="xʸ" width={defaultKeyWidth} onClick={onClick(A.POW)} />
          <Key label="LOG" width={defaultKeyWidth} onClick={onClick(A.LOG)} />
          <Key label="LN" width={defaultKeyWidth} onClick={onClick(A.LN)} />
          <Key label="eˣ" width={defaultKeyWidth} onClick={onClick(A.EXP)} />
          <Key label="CLR" width={defaultKeyWidth} onClick={onClick(A.CLR)} />
        </div>
        <div className="Keyboard--row">
          <Key label="√x" width={defaultKeyWidth} onClick={onClick(A.SQRT)} />
          <Key label="ARC" width={defaultKeyWidth} onClick={onClick(A.ARC)} />
          <Key label="SIN" width={defaultKeyWidth} onClick={onClick(A.SIN)} />
          <Key label="COS" width={defaultKeyWidth} onClick={onClick(A.COS)} />
          <Key label="TAN" width={defaultKeyWidth} onClick={onClick(A.TAN)} />
        </div>
        <div className="Keyboard--row">
          <Key label="¹/x" width={defaultKeyWidth} onClick={onClick(A.RECIPROCAL)} />
          <Key label="x↔︎y" width={defaultKeyWidth} onClick={onClick(A.SWAP)} />
          <Key label="R↓" width={defaultKeyWidth} onClick={onClick(A.ROLL_DOWN)} />
          <Key label="STO" width={defaultKeyWidth} onClick={onClick(A.STO)} />
          <Key label="RCL" width={defaultKeyWidth} onClick={onClick(A.RCL)} />
        </div>
        <div className="Keyboard--row">
          <Key label="Enter ↑" width={enterKeyWidth} onClick={onClick(A.ENTER)} />
          <Key label="CHS" width={defaultKeyWidth} onClick={onClick(A.CHS)} />
          <Key label="EEX" width={defaultKeyWidth} onClick={onClick(A.EEX)} />
          <Key label="CLX" width={defaultKeyWidth} onClick={onClick(A.CLX)} />
        </div>
        <div className="Keyboard--row">
          <Key label="-" width={arithKeyWidth} onClick={onClick(A.SUB)} />
          <Key label="7" width={inputKeyWidth} onClick={onClick(A.DIGIT_7)} />
          <Key label="8" width={inputKeyWidth} onClick={onClick(A.DIGIT_8)} />
          <Key label="9" width={inputKeyWidth} onClick={onClick(A.DIGIT_9)} />
        </div>
        <div className="Keyboard--row">
          <Key label="+" width={arithKeyWidth} onClick={onClick(A.ADD)} />
          <Key label="4" width={inputKeyWidth} onClick={onClick(A.DIGIT_4)} />
          <Key label="5" width={inputKeyWidth} onClick={onClick(A.DIGIT_5)} />
          <Key label="6" width={inputKeyWidth} onClick={onClick(A.DIGIT_6)} />
        </div>
        <div className="Keyboard--row">
          <Key label="×" width={arithKeyWidth} onClick={onClick(A.MUL)} />
          <Key label="1" width={inputKeyWidth} onClick={onClick(A.DIGIT_1)} />
          <Key label="2" width={inputKeyWidth} onClick={onClick(A.DIGIT_2)} />
          <Key label="3" width={inputKeyWidth} onClick={onClick(A.DIGIT_3)} />
        </div>
        <div className="Keyboard--row">
          <Key label="÷" width={arithKeyWidth} onClick={onClick(A.DIV)} />
          <Key label="0" width={inputKeyWidth} onClick={onClick(A.DIGIT_0)} />
          <Key label="•" width={inputKeyWidth} onClick={onClick(A.DECIMAL)} />
          <Key label="π" width={inputKeyWidth} onClick={onClick(A.PI)} />
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