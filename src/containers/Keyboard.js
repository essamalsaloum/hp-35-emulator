import React from 'react'
import PropTypes from 'prop-types'

import store from '../store'
import execute from '../alu/operations/executor'
import * as C from '../alu/opCodes'
import Key from '../components/Key'

export default class Keyboard extends React.Component {

  static propTypes = {
    keyPress: PropTypes.func
  }

  static defaultProps = {
    keyPress: () => undefined
  }

  keyPress(opCode) {
    return () => store.setState(execute(opCode)(store.getState()))
  }

  render() {
    return (
      <div>
        <div className="row">
          <Key className="col s3" label="𝓍ʸ" keyPress={this.keyPress(C.POW)} />
          <Key className="col s3" label="LOG" keyPress={this.keyPress(C.LOG)} />
          <Key className="col s3" label="LN" keyPress={this.keyPress(C.LN)} />
          <Key className="col s3" label="𝑒ˣ" keyPress={this.keyPress(C.EXP)} />
          <Key className="col s3" label="CLR" keyPress={this.keyPress(C.CLR)} />
        </div>
        <div className="row">
          <Key className="col s3" label="√𝑥" keyPress={this.keyPress(C.SQRT)} />
          <Key className="col s3" label="ARC" keyPress={this.keyPress(C.ARC)} />
          <Key className="col s3" label="SIN" keyPress={this.keyPress(C.SIN)} />
          <Key className="col s3" label="COS" keyPress={this.keyPress(C.COS)} />
          <Key className="col s3" label="TAN" keyPress={this.keyPress(C.TAN)} />
        </div>
        <div className="row">
          <Key className="col s3" label="¹/𝓍" keyPress={this.keyPress(C.RECIPROCAL)} />
          <Key className="col s3" label="𝑥⬄𝑦" keyPress={this.keyPress(C.SWAP)} />
          <Key className="col s3" label="R↓" keyPress={this.keyPress(C.ROLL_DOWN)} />
          <Key className="col s3" label="STO" keyPress={this.keyPress(C.STO)} />
          <Key className="col s3" label="RCL" keyPress={this.keyPress(C.RCL)} />
        </div>
        <div className="row">
          <Key className="col s3" label="Enter ↑" keyPress={this.keyPress(C.ENTER)} />
          <Key className="col s3" label="CHS" keyPress={this.keyPress(C.CHS)} />
          <Key className="col s3" label="EEX" keyPress={this.keyPress(C.EEX)} />
          <Key className="col s3" label="CL𝓧" keyPress={this.keyPress(C.CLX)} />
        </div>
        <div className="row">
          <Key className="col s3" label="-" keyPress={this.keyPress(C.SUB)} />
          <Key className="col s3" label="7" keyPress={this.keyPress(C.DIGIT_7)} />
          <Key className="col s3" label="8" keyPress={this.keyPress(C.DIGIT_8)} />
          <Key className="col s3" label="9" keyPress={this.keyPress(C.DIGIT_9)} />
        </div>
        <div className="row">
          <Key className="col s3" label="+" keyPress={this.keyPress(C.ADD)} />
          <Key className="col s3" label="4" keyPress={this.keyPress(C.DIGIT_4)} />
          <Key className="col s3" label="5" keyPress={this.keyPress(C.DIGIT_5)} />
          <Key className="col s3" label="6" keyPress={this.keyPress(C.DIGIT_6)} />
        </div>
        <div className="row">
          <Key className="col s3" label="×" keyPress={this.keyPress(C.MUL)} />
          <Key className="col s3" label="1" keyPress={this.keyPress(C.DIGIT_1)} />
          <Key className="col s3" label="2" keyPress={this.keyPress(C.DIGIT_2)} />
          <Key className="col s3" label="3" keyPress={this.keyPress(C.DIGIT_3)} />
        </div>
        <div className="row">
          <Key className="col s3" label="÷" keyPress={this.keyPress(C.DIV)} />
          <Key className="col s3" label="0" keyPress={this.keyPress(C.DIGIT_0)} />
          <Key className="col s3" label="•" keyPress={this.keyPress(C.DECIMAL)} />
          <Key className="col s3" label="π" keyPress={this.keyPress(C.PI)} />
        </div>
      </div>
    )
  }
}
