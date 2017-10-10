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
  [K.ACOSH]: '<small>ACOSH</small>',
  [K.ADD]: '+',
  [K.ALOG]: '10<sup>x</sup>',
  [K.ASIN]: 'ASIN',
  [K.ASINH]: '<small>ASINH</small>',
  [K.ATAN]: 'ATAN',
  [K.ATANH]: '<small>ATANH</small>',
  [K.CANCEL]: 'C',
  [K.CHS]: '+/-',
  [K.CLR]: 'CLR',
  [K.CONST]: 'Const',
  [K.CONV]: 'Conv',
  [K.COS]: 'COS',
  [K.COSH]: '<small>COSH</small>',
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
  [K.DEL]: '←',
  [K.DIV]: '÷',
  [K.DOT]: '•',
  [K.EEX]: 'EEX',
  [K.ENTER]: 'ENTER ↑',
  [K.EXP]: 'e<sup>x</sup>',
  [K.FACT]: '!',
  [K.INV]: '1/x',
  [K.LAST_X]: 'LASTx',
  [K.LN]: 'LN',
  [K.LOG]: 'LOG',
  [K.MEM]: 'MEM',
  [K.MUL]: '×',
  [K.NCR]: 'nCr',
  [K.NOOP]: '',
  [K.NPR]: 'nPr',
  [K.PCT]: '%',
  [K.PCTCHG]: '%chg',
  [K.PI]: 'π',
  [K.POW]: 'y<sup>x</sup>',
  [K.RESET]: 'RESET',
  [K.ROLL_DOWN]: 'R↓',
  [K.SHIFT_DOWN]: 'g',
  [K.HYPER]: 'HYP',
  [K.SHIFT_UP]: 'f',
  [K.SIN]: 'SIN',
  [K.SINH]: '<small>SINH</small>',
  [K.SQ]: 'x<sup>2</sup',
  [K.SQRT]: '√x',
  [K.SUB]: '−',
  [K.SWAP]: 'x↔︎y',
  [K.TAN]: 'TAN',
  [K.TANH]: '<small>TANH</small>',
}

const createMarkup = label => ({ __html: label })

class Key extends React.PureComponent {

  static propTypes = {
    keyCode: PropTypes.string.isRequired,
    up: PropTypes.string,
    down: PropTypes.string,
    executeKeyCode: PropTypes.func,
    shiftKey: PropTypes.string,
    setShiftKey: PropTypes.func.isRequired,
    setMainPanel: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    shiftCodes: {},
    className: '',
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    const { keyCode, setShiftKey, executeKeyCode, setMainPanel } = this.props
    let shiftKey = null
    switch (keyCode) {
      case K.SHIFT_UP:
        shiftKey = this.props.shiftKey === K.SHIFT_UP ? null : K.SHIFT_UP
        break
      case K.SHIFT_DOWN:
        shiftKey = this.props.shiftKey === K.SHIFT_DOWN ? null : K.SHIFT_DOWN
        break
      case K.HYPER:
        shiftKey = this.props.shiftKey === K.HYPER ? null : K.HYPER
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
      case K.NOOP:
        break
      case K.CANCEL:
        if (shiftKey) {
          shiftKey = null
        } else {
          executeKeyCode(K.CANCEL)
        }
        break
      case K.RESET:
        break
      default:
        executeKeyCode(keyCode)
    }
    setShiftKey(shiftKey)
  }

  renderTopLabel() {
    const { up, shiftKey } = this.props
    return up && !shiftKey ? (
      <div className="Key--label-top" >
        <div dangerouslySetInnerHTML={createMarkup(keyLabels[up])} />
      </div>
    ) : (<div className="Key--label-top"></div>)
  }

  renderBottomLabel() {
    const { down, shiftKey } = this.props
    return down && !shiftKey ? (
      <div className="Key--label-bottom" dangerouslySetInnerHTML={createMarkup(keyLabels[down])}></div>
    ) : (<div className="Key--label-bottom"></div>)
  }

  render() {
    const { keyCode, shiftKey = 'none', className } = this.props
    const label = keyLabels[keyCode]
    let colorModifier = shiftKey

    if (keyCode === K.NOOP) {
      colorModifier = K.NOOP
    } else if (keyCode === K.CANCEL) {
      colorModifier = 'none'
    }

    return (
      <div className={`Key Key--keyCode-${keyCode} ${className}`}>
        <button
          type="button"
          className={`Key--button Key--color-${colorModifier || 'none'} Key--button-keyCode-${keyCode}`}
          onClick={this.onClick}
          onKeyUp={ev => ev.preventDefault()}
          onKeyDown={ev => ev.preventDefault()}
        >
          <div className="Key--label-container">
            {this.renderTopLabel()}
            <div className={`Key--label-main Key--label-keyCode-${keyCode}`} dangerouslySetInnerHTML={createMarkup(label)} />
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
  shiftKey: shiftKeySelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Key)