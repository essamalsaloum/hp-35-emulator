import React from 'react'
import K from '../../cpu/keyCodes'
import Key from '../../containers/Key'
import './Keypad.css'

export default function MainKeypad() {
  return (
    <div className="Keypad">
      <div className="Keypad--row">
        <Key keyCode={K.POW} up={K.LOG} down={K.LN} />
        <Key keyCode={K.INV} up={K.ALOG} down={K.EXP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.CLR} down={K.RESET} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} />
        <Key keyCode={K.SQRT} up={K.XROOT} down={K.SQ} />
        <Key keyCode={K.SIN} up={K.ASIN} down={K.RAD2DEG} />
        <Key keyCode={K.COS} up={K.ACOS} down={K.DEG2RAD} />
        <Key keyCode={K.TAN} up={K.ATAN} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.RCL} down={K.STO} />
        <Key keyCode={K.SWAP} />
        <Key keyCode={K.ROLL_DOWN} />
        <Key keyCode={K.FACT} up={K.NCR} down={K.NPR} />
        <Key keyCode={K.PCT} down={K.PCTCHG} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.ENTER} down={K.LAST_X} className="Key--ENTER" />
        <Key keyCode={K.CHS} />
        <Key keyCode={K.EEX} />
        <Key keyCode={K.DEL} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.MEM} up={K.CONST} />
        <Key keyCode={K.D7} up={K.CONV} />
        <Key keyCode={K.D8} up={K.HYPER} />
        <Key keyCode={K.D9} />
        <Key keyCode={K.DIV} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.SHIFT_UP} />
        <Key keyCode={K.D4} />
        <Key keyCode={K.D5} />
        <Key keyCode={K.D6} />
        <Key keyCode={K.MUL} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.SHIFT_DOWN} />
        <Key keyCode={K.D1} />
        <Key keyCode={K.D2} />
        <Key keyCode={K.D3} />
        <Key keyCode={K.SUB} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.CANCEL} />
        <Key keyCode={K.D0} />
        <Key keyCode={K.DOT} />
        <Key keyCode={K.PI} />
        <Key keyCode={K.ADD} />
      </div>
    </div>
  )
}