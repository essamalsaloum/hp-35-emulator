import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { executeKeyCode } from '../cpu/reducer'
import { setShiftKey, shiftKeySelector } from '../ducks/ui'
import { setMainPanel } from '../ducks/ui'
import K from '../cpu/keyCodes'
import C from '../constants'
import './Key.css'

const keyLabels = {
  [K.ACOS]: 'ACOS',
  [K.ADD]: '+',
  [K.ALOG]: '10<sup>x</sup>',
  [K.ASIN]: 'ASIN',
  [K.ATAN]: 'ATAN',
  [K.CANCEL]: 'C',
  [K.CHS]: '+/-',
  [K.CLR]: 'CLR',
  [K.CLX]: 'CLX',
  [K.CONST]: 'Const',
  [K.CONV]: 'Conv',
  [K.COS]: 'COS',
  [K.D0]: '0',
  [K.D1]: '1',
  [K.D2]: '2',
  [K.D3]: '3',
  [K.D4]: '4',
  [K.D5]: '5',
  [K.D6]: '6',
  [K.D7]: '7',
  [K.D8]: '8',
  [K.D9]: '9',
  [K.DIV]: '÷',
  [K.DOT]: '•',
  [K.EEX]: 'EEX',
  [K.ENTER]: 'ENTER ↑',
  [K.EXP]: 'e<sup>x</sup>',
  [K.FACT]: '!',
  [K.INV]: '1/x',
  [K.LN]: 'LN',
  [K.LOG]: 'LOG',
  [K.MEM]: 'MEM',
  [K.MUL]: '×',
  [K.NCR]: 'nCr',
  [K.NPR]: 'nPr',
  [K.PCT]: '%',
  [K.PCTCHG]: '%chg',
  [K.PI]: 'π',
  [K.POW]: 'y<sup>x</sup>',
  [K.RESET]: 'RESET',
  [K.ROLL_DOWN]: 'R↓',
  [K.SHIFT_DOWN]: 'g',
  [K.SHIFT_UP]: 'f',
  [K.SIN]: 'SIN',
  [K.SQ]: 'x<sup>2</sup',
  [K.SQRT]: '√x',
  [K.SUB]: '−',
  [K.SWAP]: 'x↔︎y',
  [K.TAN]: 'TAN',
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
      case K.SHIFT_UP:
        setShiftKey(shiftKey === K.SHIFT_UP ? null : K.SHIFT_UP)
        break
      case K.SHIFT_DOWN:
        setShiftKey(shiftKey === K.SHIFT_DOWN ? null : K.SHIFT_DOWN)
        break
      case K.MEM:
        setMainPanel(C.MEMORY_PANEL)
        break
      case K.CONST:
        setMainPanel(C.CONSTANTS_PANEL)
        break
      case K.CONV:
        setMainPanel(C.CONVERSIONS_PANEL)
        break
      case K.RESET:
        break
      default:
        if (!shiftKey || (shiftKey && shiftCodes[shiftKey])) {
          executeKeyCode(keyCode)
        }
    }

    if (shiftKey && keyCode !== K.SHIFT_UP && keyCode !== K.SHIFT_DOWN) {
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
    const keyCodeUp = shiftCodes[K.SHIFT_UP]
    return keyCodeUp && !shiftKey ? (
      <div className="Key--label-top" dangerouslySetInnerHTML={createMarkup(keyLabels[keyCodeUp])}></div>
    ) : (<div className="Key--label-top"></div>)
  }

  renderBottomLabel() {
    const { shiftCodes, shiftKey } = this.props
    const keyCodeDown = shiftCodes[K.SHIFT_DOWN]
    return keyCodeDown && !shiftKey ? (
      <div className="Key--label-bottom" dangerouslySetInnerHTML={createMarkup(keyLabels[keyCodeDown])}></div>
    ) : (<div className="Key--label-bottom"></div>)
  }

  render() {
    const { keyCode, shiftKey = 'none', shiftCodes } = this.props
    let label = keyLabels[keyCode]
    let colorModifier = 'none'

    if (shiftKey === K.SHIFT_UP) {
      label = keyLabels[keyCode === K.SHIFT_UP ? K.SHIFT_UP : shiftCodes[K.SHIFT_UP]]
      colorModifier = shiftCodes[K.SHIFT_UP] ? K.SHIFT_UP : colorModifier
    } else if (shiftKey === K.SHIFT_DOWN) {
      label = keyLabels[keyCode === K.SHIFT_DOWN ? K.SHIFT_DOWN : shiftCodes[K.SHIFT_DOWN]]
      colorModifier = shiftCodes[K.SHIFT_DOWN] ? K.SHIFT_DOWN : colorModifier
    }

    return (
      <div className={`Key Key--keyCode-${keyCode}`}>
        <button
          type="button"
          className={`Key--button Key--color-${colorModifier || 'none'} Key--button-keyCode-${keyCode}`}
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