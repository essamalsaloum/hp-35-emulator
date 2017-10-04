import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { executeKeyCode } from '../cpu/reducer'
import { setShiftKey, shiftKeySelector } from '../ducks/shiftKey'
import { setMainPanel } from '../ducks/ui'
import C from '../cpu/keyCodes'
import './Key.css'

const keyLabels = {
  [C.ACOS]: 'acos',
  [C.ADD]: '+',
  [C.ALOG]: '10<sup>x</sup>',
  [C.ASIN]: 'asin',
  [C.ATAN]: 'atan',
  [C.CANCEL]: 'C',
  [C.CHS]: '+/-',
  [C.CLR]: 'CLR',
  [C.CLX]: 'CLX',
  [C.CONST]: 'Const',
  [C.COS]: 'cos',
  [C.D0]: '0',
  [C.D1]: '1',
  [C.D2]: '2',
  [C.D3]: '3',
  [C.D4]: '4',
  [C.D5]: '5',
  [C.D6]: '6',
  [C.D7]: '7',
  [C.D8]: '8',
  [C.D9]: '9',
  [C.DIV]: '÷',
  [C.DOT]: '•',
  [C.EEX]: 'EEX',
  [C.ENTER]: 'Enter ↑',
  [C.EXP]: 'e<sup>x</sup>',
  [C.FACT]: '!',
  [C.INV]: '1/x',
  [C.LN]: 'ln',
  [C.LOG]: 'log',
  [C.MEM]: 'MEM',
  [C.MUL]: '×',
  [C.NCR]: 'nCr',
  [C.NPR]: 'nPr',
  [C.PCT]: '%',
  [C.PCTCHG]: '%chg',
  [C.PI]: 'π',
  [C.POW]: 'y<sup>x</sup>',
  [C.RCL]: 'RCL',
  [C.RCL_A]: 'A',
  [C.RCL_B]: 'B',
  [C.RCL_C]: 'C',
  [C.RCL_D]: 'D',
  [C.RCL_E]: 'E',
  [C.RCL_F]: 'F',
  [C.RCL_G]: 'G',
  [C.RCL_H]: 'H',
  [C.RCL_I]: 'I',
  [C.RCL_J]: 'J',
  [C.RCL_K]: 'K',
  [C.RCL_L]: 'L',
  [C.RCL_M]: 'M',
  [C.RCL_N]: 'N',
  [C.RCL_O]: 'O',
  [C.RCL_P]: 'P',
  [C.RCL_Q]: 'Q',
  [C.RCL_R]: 'R',
  [C.RCL_S]: 'S',
  [C.RCL_T]: 'T',
  [C.RCL_U]: 'U',
  [C.RCL_V]: 'V',
  [C.RCL_W]: 'W',
  [C.RCL_X]: 'X',
  [C.RCL_Y]: 'Y',
  [C.RCL_Z]: 'Z',
  [C.ROLL_DOWN]: 'R↓',
  [C.SHIFT_DOWN]: 'g',
  [C.SHIFT_UP]: 'f',
  [C.SIN]: 'sin',
  [C.SQ]: 'x<sup>2</sup',
  [C.SQRT]: '√x',
  [C.STO]: 'STO',
  [C.STO_A]: 'A',
  [C.STO_B]: 'B',
  [C.STO_C]: 'C',
  [C.STO_D]: 'D',
  [C.STO_E]: 'E',
  [C.STO_F]: 'F',
  [C.STO_G]: 'G',
  [C.STO_H]: 'H',
  [C.STO_I]: 'I',
  [C.STO_J]: 'J',
  [C.STO_K]: 'K',
  [C.STO_L]: 'L',
  [C.STO_M]: 'M',
  [C.STO_N]: 'N',
  [C.STO_O]: 'O',
  [C.STO_P]: 'P',
  [C.STO_Q]: 'Q',
  [C.STO_R]: 'R',
  [C.STO_S]: 'S',
  [C.STO_T]: 'T',
  [C.STO_U]: 'U',
  [C.STO_V]: 'V',
  [C.STO_W]: 'W',
  [C.STO_X]: 'X',
  [C.STO_Y]: 'Y',
  [C.STO_Z]: 'Z',
  [C.SUB]: '−',
  [C.SWAP]: 'x↔︎y',
  [C.TAN]: 'tan',
}

const createMarkup = label => ({ __html: label })

class Key extends React.PureComponent {

  static propTypes = {
    keyCode: PropTypes.string.isRequired,
    shiftCodes: PropTypes.object,
    executeKeyCode: PropTypes.func,
    shiftKey: PropTypes.string,
    setShiftKey: PropTypes.func.isRequired,
    setMainPanel: PropTypes.func.isRequired,
  }

  static defaultProps = {
    shiftCodes: {}
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    const keyCode = this.getShiftedKeyCode()
    const { shiftKey, shiftCodes, setShiftKey, executeKeyCode, setMainPanel } = this.props

    switch (keyCode) {
      case C.SHIFT_UP:
        setShiftKey(shiftKey === C.SHIFT_UP ? null : C.SHIFT_UP)
        break
      case C.SHIFT_DOWN:
        setShiftKey(shiftKey === C.SHIFT_DOWN ? null : C.SHIFT_DOWN)
        break
      case C.MEM:
        setMainPanel('memory')
        break
      case C.CONST:
        setMainPanel('constants')
        break
      default:
        if (!shiftKey || (shiftKey && shiftCodes[shiftKey])) {
          executeKeyCode(keyCode)
        }
    }

    if (shiftKey && keyCode !== C.SHIFT_UP && keyCode !== C.SHIFT_DOWN) {
      setShiftKey(null)
    }
  }

  getShiftedKeyCode() {
    const { keyCode } = this.props
    const { shiftKey, shiftCodes } = this.props
    return shiftKey && shiftCodes[shiftKey] ? shiftCodes[shiftKey] : keyCode
  }

  renderTopLabel() {
    const { shiftCodes, shiftKey } = this.props
    const keyCodeUp = shiftCodes[C.SHIFT_UP]
    return keyCodeUp && !shiftKey ? (
      <div className="Key--label-top" dangerouslySetInnerHTML={createMarkup(keyLabels[keyCodeUp])}></div>
    ) : (<div className="Key--label-top"></div>)
  }

  renderBottomLabel() {
    const { shiftCodes, shiftKey } = this.props
    const keyCodeDown = shiftCodes[C.SHIFT_DOWN]
    return keyCodeDown && !shiftKey ? (
      <div className="Key--label-bottom" dangerouslySetInnerHTML={createMarkup(keyLabels[keyCodeDown])}></div>
    ) : (<div className="Key--label-bottom"></div>)
  }

  render() {
    const { keyCode, shiftKey = 'none', shiftCodes } = this.props
    let label = keyLabels[keyCode]

    if (shiftKey === C.SHIFT_UP) {
      label = keyLabels[keyCode === C.SHIFT_UP ? C.SHIFT_UP : shiftCodes[C.SHIFT_UP]]
    } else if (shiftKey === C.SHIFT_DOWN) {
      label = keyLabels[keyCode === C.SHIFT_DOWN ? C.SHIFT_DOWN : shiftCodes[C.SHIFT_DOWN]]
    } else if (shiftKey === C.STO) {
      label = keyLabels[keyCode === C.STO ? C.STO : shiftCodes[C.STO]]
    } else if (shiftKey === C.RCL) {
      label = keyLabels[keyCode === C.STO ? C.RCL : shiftCodes[C.RCL]]
    }

    return (
      <div className={`Key Key--keyCode-${keyCode}`}>
        <button
          type="button"
          className={`Key--button Key--color-${shiftKey || 'none'} Key--button-keyCode-${keyCode}`}
          onClick={this.onClick}
          onKeyUp={ev => ev.preventDefault()}
          onKeyDown={ev => ev.preventDefault()}
        >
          <div className="Key--label-container">
            {this.renderTopLabel()}
            <div className={`Key--label-main Key--label-keyCode-${keyCode}`} dangerouslySetInnerHTML={createMarkup(label)}></div>
            {this.renderBottomLabel()}
          </div>
        </button>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    executeKeyCode,
    setShiftKey,
    setMainPanel,
  }, dispatch)

const mapStateToProps = state => ({
  shiftKey: shiftKeySelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Key)