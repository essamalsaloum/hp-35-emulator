import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { executeKeyCode, errorSelector } from '../cpu/reducer'
import { setShiftKey, shiftKeySelector, setMainPanel } from '../ducks/ui'
import { reset } from '../ducks'
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
  [K.C2F]: '<small>°C‣°F</small>',
  [K.CANCEL]: 'C',
  [K.CHS]: '+/−',
  [K.CLR]: 'CLR',
  [K.CM2IN]: '<small>cm‣in</small>',
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
  [K.DEG2RAD]: '→RAD',
  [K.DEL]: '←',
  [K.DIV]: '÷',
  [K.DOT]: '•',
  [K.EEX]: 'EEX',
  [K.ENTER]: 'ENTER',
  [K.EXP]: 'e<sup>x</sup>',
  [K.EXPM]: 'e<sup>x-1</sup>',
  [K.F2C]: '<small>°F‣°C</small>',
  [K.FACT]: '!',
  [K.FRAC2HMS]: '‣HMS',
  [K.FT2M]: '<small>ft‣m</small>',
  [K.G2OZ]: '<small>g‣oz</small>',
  [K.GAL2L]: '<small>gal‣l</small>',
  [K.HMS2FRAC]: '<small>HMS‣</small>',
  [K.HYPER]: 'HYP',
  [K.IN2CM]: '<small>in‣cm</small>',
  [K.INV]: '1/x',
  [K.KG2LB]: '<small>kg‣lb</small>',
  [K.KM2MI]: '<small>km‣mi</small>',
  [K.L2GAL]: '<small>l‣gal</small>',
  [K.LAST_X]: 'LASTx',
  [K.LB2KG]: '<small>lb‣kg</small>',
  [K.LN]: 'LN',
  [K.LNP1]: 'LNP1',
  [K.LOG]: 'LOG',
  [K.M2FT]: '<small>m‣ft<small>',
  [K.M2YD]: '<small>m‣yd</small>',
  [K.MEM]: 'MEM',
  [K.MI2KM]: '<small>mi‣km</small>',
  [K.MUL]: '×',
  [K.NCR]: 'nCr',
  [K.NOOP]: '',
  [K.NPR]: 'nPr',
  [K.OZ2G]: '<small>oz‣g</small>',
  [K.PCT]: '%',
  [K.PCTCHG]: 'Δ%',
  [K.PI]: 'π',
  [K.POW]: 'y<sup>x</sup>',
  [K.RAD2DEG]: '→DEG',
  [K.RESET]: 'RESET',
  [K.ROLL_DOWN]: 'R↓',
  [K.SHIFT_DOWN]: 'g',
  [K.SHIFT_UP]: 'f',
  [K.SIN]: 'SIN',
  [K.SINH]: '<small>SINH</small>',
  [K.SQ]: 'x<sup>2</sup',
  [K.SQRT]: '√x',
  [K.SUB]: '−',
  [K.SWAP]: 'x↔︎y',
  [K.TAN]: 'TAN',
  [K.TANH]: '<small>TANH</small>',
  [K.YD2M]: '<small>yd‣m<small>',
  }

const createMarkup = label => ({ __html: label })

class Key extends React.PureComponent {

  static propTypes = {
    keyCode: PropTypes.string.isRequired,
    error: PropTypes.object,
    up: PropTypes.string,
    down: PropTypes.string,
    executeKeyCode: PropTypes.func,
    shiftKey: PropTypes.string,
    setShiftKey: PropTypes.func.isRequired,
    setMainPanel: PropTypes.func.isRequired,
    className: PropTypes.string,
    reset: PropTypes.func.isRequired,
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
    const { keyCode, error, setShiftKey, executeKeyCode, setMainPanel, reset } = this.props
    let shiftKey = null
    switch (keyCode) {
      case K.SHIFT_UP:
        shiftKey = this.props.shiftKey === K.SHIFT_UP ? null : K.SHIFT_UP
        break
      case K.SHIFT_DOWN:
        shiftKey = this.props.shiftKey === K.SHIFT_DOWN ? null : K.SHIFT_DOWN
        break
      case K.HYPER:
        shiftKey = K.HYPER
        break
      case K.CONV:
        shiftKey = K.CONV
        break
      case K.MEM:
        setMainPanel(C.MEMORY_PANEL)
        break
      case K.CONST:
        setMainPanel(C.CONSTANTS_PANEL)
        break
      case K.NOOP:
        return
      case K.CANCEL:
        if (!this.props.shiftKey || error) {
          executeKeyCode(K.CANCEL)
        }
        break
      case K.RESET:
        reset()
        break
      default:
        executeKeyCode(keyCode)
    }
    if (shiftKey !== this.props.shiftKey) {
      setShiftKey(shiftKey)
    }
  }

  renderTopLabel() {
    const { error, up } = this.props
    if (error) {
      return null
    }
    return up ? (
      <div
        className="Key--label-top"
        dangerouslySetInnerHTML={createMarkup(keyLabels[up])}
      />) : <div className="Key--label-top" />
  }

  renderBottomLabel() {
    const { error, down } = this.props
    if (error) {
      return null
    }
    return down ? (
      <div
        className="Key--label-bottom"
        dangerouslySetInnerHTML={createMarkup(keyLabels[down])}
      />
    ) : <div className="Key--label-bottom" />
  }

  renderMainLabel(keyCode, label) {
    const { error } = this.props
    if (error && keyCode !== K.CANCEL) {
      return null
    }
    return (
      <div
        className={`Key--label-main Key--label-keyCode-${keyCode}`}
        dangerouslySetInnerHTML={createMarkup(label)}
      />
    )
  }

  render() {
    const { keyCode, error, shiftKey, className } = this.props
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
          className={`Key--button Key--color-${colorModifier} Key--button-keyCode-${keyCode}`}
          onClick={this.onClick}
          onKeyUp={ev => ev.preventDefault()}
          onKeyDown={ev => ev.preventDefault()}
          disabled={error && keyCode !== K.CANCEL}
        >
          <div className="Key--label-container">
            {this.renderTopLabel()}
            {this.renderMainLabel(keyCode, label)}
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
    reset,
  }, dispatch)

const mapStateToProps = state => ({
  shiftKey: shiftKeySelector(state),
  error: errorSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Key)