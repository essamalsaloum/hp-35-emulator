import React from 'react'
import K from '../../cpu/keyCodes'
import Key from '../../containers/Key'
import './Keypad.css'

export default function HyperbolicKeypad() {
  return (
    <div className="Keypad">
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.EXPM} />
        <Key keyCode={K.SINH} />
        <Key keyCode={K.COSH} />
        <Key keyCode={K.TANH} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.LNP1} />
        <Key keyCode={K.ASINH} />
        <Key keyCode={K.ACOSH} />
        <Key keyCode={K.ATANH} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} className="Key--ENTER" />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.CANCEL} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
      </div>
    </div>
  )
}