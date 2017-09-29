import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { executeKeyCode } from '../ducks/processor'
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
    labelClass: PropTypes.string,
    executeKeyCode: PropTypes.func,
    shiftKey: PropTypes.string,
    setShiftKey: PropTypes.func.isRequired
  }

  static defaultProps = {
    topLabel: '',
    bottomLabel: '',
    labelClass: ''
  }

  onClick(keyCode) {
    const { shiftKey, setShiftKey, executeKeyCode } = this.props
    if (keyCode === C.SHIFT_UP) {
      setShiftKey(shiftKey === C.SHIFT_UP ? null : C.SHIFT_UP)
    }
    else if (keyCode === C.SHIFT_DOWN) {
      setShiftKey(shiftKey === C.SHIFT_DOWN ? null : C.SHIFT_DOWN)
    } else {
      const keyMap = shiftKeyModifiers[keyCode]
      keyCode = (keyMap && keyMap[shiftKey]) || keyCode
      executeKeyCode(keyCode)
      if (shiftKey) {
        setShiftKey(null)
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
      labelClass,
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
            <div className={`Key--label-main Key--label-keyCode-${keyCode} ${labelClass}`} dangerouslySetInnerHTML={createMarkup(decorator.label)}></div>
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