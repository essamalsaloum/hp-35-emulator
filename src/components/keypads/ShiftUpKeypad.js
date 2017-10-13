import React from 'react'
import K from '../../cpu/keyCodes'
import Key from '../../containers/Key'
import './Keypad.css'

export default function ShiftUpKeypad() {
  return (
    <div className="Keypad">
      <div className="Keypad--row">
        <Key keyCode={K.LOG} />
        <Key keyCode={K.ALOG} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.XROOT} />
        <Key keyCode={K.ASIN} />
        <Key keyCode={K.ACOS} />
        <Key keyCode={K.ATAN} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NCR} />
        <Key keyCode={K.NOOP} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} className="Key--enter" />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.CONST} />
        <Key keyCode={K.CONV} />
        <Key keyCode={K.HYPER} />
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