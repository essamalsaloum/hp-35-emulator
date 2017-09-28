import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import mapKeyboardEvent from '../processor/keyboardEventMapper'
import { injectKeyCode } from '../ducks/processor'
import { setShiftKey, shiftKeySelector } from '../ducks/shiftKey'
import C from '../processor/keyCodes'
import './Key.css'

const shiftKeyModifiers = {
  [C.EXP]: { [C.SHIFT_UP]: C.ALOG },
  [C.SIN]: { [C.SHIFT_DOWN]: C.ASIN },
  [C.COS]: { [C.SHIFT_DOWN]: C.ACOS },
  [C.TAN]: { [C.SHIFT_DOWN]: C.ATAN },
}

const createMarkup = label => ({ __html: label })

class Key extends React.PureComponent {

  static propTypes = {
    keyCode: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    topLabel: PropTypes.string,
    bottomLabel: PropTypes.string,
    addClass: PropTypes.string,
    injectKeyCode: PropTypes.func,
    shiftKey: PropTypes.string,
    setShiftKey: PropTypes.func.isRequired
  }

  static defaultProps = {
    topLabel: '',
    bottomLabel: '',
    addClass: ''
  }

  keyUpHandler = ev => {
    const keyCode = mapKeyboardEvent(ev)
    if (keyCode) {
      this.props.setShiftKey(null)
      this.props.injectKeyCode(keyCode)
    }
  }

  componentDidMount() {
    const elem = document.querySelector('.App--main')
    if (elem) {
      elem.addEventListener('keyup', this.keyUpHandler)
    }
  }

  componentWillUnmount() {
    const elem = document.querySelector('.App--main')
    if (elem) {
      elem.removeEventListener('keyup', this.keyUpHandler)
    }
  }

  onClick(keyCode) {
    const { shiftKey } = this.props
    if (keyCode === C.SHIFT_UP) {
      this.props.setShiftKey(shiftKey === C.SHIFT_UP ? null : C.SHIFT_UP)
    }
    else if (keyCode === C.SHIFT_DOWN) {
      this.props.setShiftKey(shiftKey === C.SHIFT_DOWN ? null : C.SHIFT_DOWN)
    } else {
      const keyMap = shiftKeyModifiers[keyCode]
      keyCode = (keyMap && keyMap[shiftKey]) || keyCode
      this.props.injectKeyCode(keyCode)
      if (shiftKey) {
        this.props.setShiftKey(null)
      }
    }
  }

  renderTopLabel() {
    const { shiftKey, topLabel } = this.props
    return shiftKey ? (<div className="Key--label-top"></div>) : (
      <div className="Key--label-top" dangerouslySetInnerHTML={createMarkup(topLabel)}></div>
    )
  }

  renderBottomLabel() {
    const { shiftKey, bottomLabel } = this.props
    return shiftKey ? (<div className="Key--label-bottom"></div>) : (
      <div className="Key--label-bottom" dangerouslySetInnerHTML={createMarkup(bottomLabel)}></div>
    )
  }

  render() {
    const {
      label,
      topLabel,
      bottomLabel,
      keyCode,
      addClass,
      shiftKey
    } = this.props
    const decorator = {
      label,
      shiftKey: ''
    }
    if ((topLabel || keyCode === C.SHIFT_UP) && shiftKey === C.SHIFT_UP) {
      decorator.label = topLabel || label
      decorator.shiftKey = shiftKey
    } else if ((bottomLabel || keyCode === C.SHIFT_DOWN) && shiftKey === C.SHIFT_DOWN) {
      decorator.label = bottomLabel || label
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
            <div className={`Key--label-main Key--label-keyCode-${keyCode} ${addClass}`} dangerouslySetInnerHTML={createMarkup(decorator.label)}></div>
            {this.renderBottomLabel()}
          </div>
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    injectKeyCode,
    setShiftKey,
  }, dispatch)

const mapStateToProps = state => ({
  shiftKey: shiftKeySelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Key)