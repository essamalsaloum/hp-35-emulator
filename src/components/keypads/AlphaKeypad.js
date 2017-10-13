import React from 'react'
import K from '../../cpu/keyCodes'
import Key from '../../containers/Key'
import './Keypad.css'

export default function LetterKeypad() {
  return (
    <div className="Keypad">
      <div className="Keypad--row">
        <Key keyCode={K.ALPHA_A} />
        <Key keyCode={K.ALPHA_B} />
        <Key keyCode={K.ALPHA_C} />
        <Key keyCode={K.ALPHA_D} />
        <Key keyCode={K.ALPHA_E} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.ALPHA_F} />
        <Key keyCode={K.ALPHA_G} />
        <Key keyCode={K.ALPHA_H} />
        <Key keyCode={K.ALPHA_I} />
        <Key keyCode={K.ALPHA_J} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.ALPHA_K} />
        <Key keyCode={K.ALPHA_L} />
        <Key keyCode={K.ALPHA_M} />
        <Key keyCode={K.ALPHA_N} />
        <Key keyCode={K.ALPHA_O} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.ALPHA_P} />
        <Key keyCode={K.ALPHA_Q} />
        <Key keyCode={K.ALPHA_R} />
        <Key keyCode={K.ALPHA_S} />
        <Key keyCode={K.ALPHA_T} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.ALPHA_U} />
        <Key keyCode={K.ALPHA_V} />
        <Key keyCode={K.ALPHA_W} />
        <Key keyCode={K.ALPHA_X} />
        <Key keyCode={K.DIV} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.ALPHA_Y} />
        <Key keyCode={K.ALPHA_Z} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.MUL} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.SUB} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.CANCEL} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.ADD} />
      </div>
    </div>
  )
}