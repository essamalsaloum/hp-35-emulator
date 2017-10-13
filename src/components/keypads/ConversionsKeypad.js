import React from 'react'
import K from '../../cpu/keyCodes'
import Key from '../../containers/Key'
import './Keypad.css'

export default function ConversionsKeypad() {
  return (
    <div className="Keypad">
      <div className="Keypad--row">
        <Key keyCode={K.IN2CM} />
        <Key keyCode={K.CM2IN} />
        <Key keyCode={K.FT2M} />
        <Key keyCode={K.M2FT} />
        <Key keyCode={K.F2C} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.MI2KM} />
        <Key keyCode={K.KM2MI} />
        <Key keyCode={K.YD2M} />
        <Key keyCode={K.M2YD} />
        <Key keyCode={K.C2F} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.LB2KG} />
        <Key keyCode={K.KG2LB} />
        <Key keyCode={K.OZ2G} />
        <Key keyCode={K.G2OZ} />
        <Key keyCode={K.GAL2L} />
      </div>
      <div className="Keypad--row">
        <Key keyCode={K.NOOP} className="Key--enter" />
        <Key keyCode={K.L2GAL} />
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