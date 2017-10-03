import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { executeKeyCode } from '../cpu/reducer'
import { setShiftKey, shiftKeySelector } from '../ducks/shiftKey'
import C from '../cpu/keyCodes'
import './Key.css'

const keyDefs = {
  [C.POW]: { label: 'y<sup>x</sup>', letter: 'A', shiftMap: { [C.STO]: C.STO_A, [C.RCL]: C.RCL_A } },
  [C.LOG]: { label: 'log', letter: 'B', shiftMap: { [C.STO]: C.STO_B, [C.RCL]: C.RCL_B } },
  [C.LN]: { label: 'ln', letter: 'C', shiftMap: { [C.STO]: C.STO_C, [C.RCL]: C.RCL_C } },
  [C.EXP]: { label: 'e<sup>x</sup>', top: '10<sup>x</sup>', bottom: '', letter: 'D', shiftMap: { [C.SHIFT_UP]: C.ALOG, [C.STO]: C.STO_D, [C.RCL]: C.RCL_D } },
  [C.CLR]: { label: '<small>CLR<small>', letter: 'E', shiftMap: { [C.STO]: C.STO_E, [C.RCL]: C.RCL_E } },

  [C.SQRT]: { label: '√x', letter: 'F', shiftMap: { [C.STO]: C.STO_F, [C.RCL]: C.RCL_F } },
  [C.SQ]: { label: 'x<sup>2</sup', letter: 'G', shiftMap: { [C.STO]: C.STO_G, [C.RCL]: C.RCL_G } },
  [C.SIN]: { label: 'sin', bottom: 'asin', letter: 'H', shiftMap: { [C.SHIFT_DOWN]: C.ASIN, [C.STO]: C.STO_H, [C.RCL]: C.RCL_H } },
  [C.COS]: { label: 'cos', bottom: 'acos', letter: 'I', shiftMap: { [C.SHIFT_DOWN]: C.ACOS, [C.STO]: C.STO_I, [C.RCL]: C.RCL_I } },
  [C.TAN]: { label: 'tan', bottom: 'atan', letter: 'J', shiftMap: { [C.SHIFT_DOWN]: C.ATAN, [C.STO]: C.STO_J, [C.RCL]: C.RCL_J } },

  [C.INV]: { label: '<small>1/x</small>', letter: 'K', shiftMap: { [C.STO]: C.STO_K, [C.RCL]: C.RCL_K } },
  [C.SWAP]: { label: 'x↔︎y', letter: 'L', shiftMap: { [C.STO]: C.STO_L, [C.RCL]: C.RCL_L } },
  [C.ROLL_DOWN]: { label: '<small>R↓</small>', letter: 'M', shiftMap: { [C.STO]: C.STO_M, [C.RCL]: C.RCL_M } },
  [C.FACT]: { label: '!', bottom: 'nPr', top: 'nCr', letter: 'N', shiftMap: { [C.SHIFT_DOWN]: C.NPR, [C.SHIFT_UP]: C.NCR, [C.STO]: C.STO_N, [C.RCL]: C.RCL_N } },
  [C.PCT]: { label: '%', bottom: '%chg', letter: 'O', shiftMap: { [C.SHIFT_DOWN]: C.PCTCHG, [C.STO]: C.STO_O, [C.RCL]: C.RCL_O } },

  [C.ENTER]: { label: '<small>ENTER ↑</small>' },
  [C.CHS]: { label: '<small>CHS</small>', letter: 'P', shiftMap: { [C.STO]: C.STO_P, [C.RCL]: C.RCL_P } },
  [C.EEX]: { label: '<small>EEX</small>', letter: 'Q', shiftMap: { [C.STO]: C.STO_Q, [C.RCL]: C.RCL_Q } },
  [C.CLX]: { label: '<small>CLX</small>', letter: 'R', shiftMap: { [C.STO]: C.STO_R, [C.RCL]: C.RCL_R } },

  [C.STO]: { label: '<small>STO</small>', bottom: 'RCL' },
  [C.D7]: { label: '7', },
  [C.D8]: { label: '8', letter: 'S', shiftMap: { [C.STO]: C.STO_S, [C.RCL]: C.RCL_S } },
  [C.D9]: { label: '9', letter: 'T', shiftMap: { [C.STO]: C.STO_T, [C.RCL]: C.RCL_T } },
  [C.DIV]: { label: '÷', letter: 'U', shiftMap: { [C.STO]: C.STO_U, [C.RCL]: C.RCL_U } },

  [C.SHIFT_UP]: { label: 'f' },
  [C.D4]: { label: '4' },
  [C.D5]: { label: '5', letter: 'V', shiftMap: { [C.STO]: C.STO_V, [C.RCL]: C.RCL_V } },
  [C.D6]: { label: '6', letter: 'W', shiftMap: { [C.STO]: C.STO_W, [C.RCL]: C.RCL_W } },
  [C.MUL]: { label: '×', letter: 'X', shiftMap: { [C.STO]: C.STO_X, [C.RCL]: C.RCL_X } },

  [C.SHIFT_DOWN]: { label: 'g' },
  [C.D1]: { label: '1' },
  [C.D2]: { label: '2', letter: 'Y', shiftMap: { [C.STO]: C.STO_Y, [C.RCL]: C.RCL_Y } },
  [C.D3]: { label: '3', letter: 'Z', shiftMap: { [C.STO]: C.STO_Z, [C.RCL]: C.RCL_Z } },
  [C.SUB]: { label: '-' },

  [C.CANCEL]: { label: 'C' },
  [C.D0]: { label: '0' },
  [C.DOT]: { label: '•' },
  [C.PI]: { label: 'π' },
  [C.ADD]: { label: '+' }
}

const createMarkup = label => ({ __html: label })

class Key extends React.PureComponent {

  static propTypes = {
    keyCode: PropTypes.string.isRequired,
    executeKeyCode: PropTypes.func,
    shiftKey: PropTypes.string,
    setShiftKey: PropTypes.func.isRequired
  }

  onClick(keyCode) {
    const { shiftKey, setShiftKey, executeKeyCode } = this.props
    const { shiftMap } = keyDefs[keyCode]
    switch (keyCode) {
      case C.SHIFT_UP:
        setShiftKey(shiftKey === C.SHIFT_UP ? null : C.SHIFT_UP)
        break
      case C.SHIFT_DOWN:
        setShiftKey(shiftKey === C.SHIFT_DOWN ? null : C.SHIFT_DOWN)
        break
      case C.STO:
        if (shiftKey === C.SHIFT_DOWN) {
          setShiftKey(C.RCL)
        } else {
          setShiftKey(shiftKey === C.STO ? null : C.STO)
        }
        break
      // case C.RCL:
      //   setShiftKey(shiftKey === C.STO ? null : C.RCL)
      //   break
      default:
        keyCode = (shiftMap && shiftMap[shiftKey]) || keyCode
        executeKeyCode(keyCode)
        if (shiftKey) {
          setShiftKey(null)
        }

    }
  }

  renderTopLabel() {
    const { shiftKey, keyCode } = this.props
    const { top = '' } = keyDefs[keyCode]
    return shiftKey ? (<div className="Key--label-top"></div>) : (
      <div className="Key--label-top" dangerouslySetInnerHTML={createMarkup(top)}></div>
    )
  }

  renderBottomLabel() {
    const { shiftKey, keyCode } = this.props
    const { bottom = '' } = keyDefs[keyCode]
    return shiftKey ? (<div className="Key--label-bottom"></div>) : (
      <div className="Key--label-bottom" dangerouslySetInnerHTML={createMarkup(bottom)}></div>
    )
  }

  render() {
    const { shiftKey, keyCode } = this.props
    const { label, top = '', bottom = '', letter = '' } = keyDefs[keyCode]
    const decorator = { label, shiftKey: '' }

    if ((top || keyCode === C.SHIFT_UP) && shiftKey === C.SHIFT_UP) {
      decorator.label = top || label
      decorator.shiftKey = shiftKey
    } else if ((bottom || keyCode === C.SHIFT_DOWN) && shiftKey === C.SHIFT_DOWN) {
      decorator.label = bottom || label
      decorator.shiftKey = shiftKey
    } else if ((letter || keyCode === C.STO) && shiftKey === C.STO) {
      decorator.label = letter || label
      decorator.shiftKey = shiftKey
    } else if ((letter || keyCode === C.RCL) && shiftKey === C.RCL) {
      decorator.label = letter || label
      decorator.shiftKey = shiftKey
    }

    return (
      <div className={`Key Key--keyCode-${keyCode}`}>
        <button
          type="button"
          className={`Key--button Key--inverse-${decorator.shiftKey} Key--button-keyCode-${keyCode}`}
          onClick={() => this.onClick(keyCode)}
          onKeyUp={ev => ev.preventDefault()}
          onKeyDown={ev => ev.preventDefault()}
        >
          <div className="Key--label-container">
            {this.renderTopLabel()}
            <div className={`Key--label-main Key--label-keyCode-${keyCode}`} dangerouslySetInnerHTML={createMarkup(decorator.label)}></div>
            {this.renderBottomLabel()}
          </div>
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    executeKeyCode,
    setShiftKey,
  }, dispatch)

const mapStateToProps = state => ({
  shiftKey: shiftKeySelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Key)