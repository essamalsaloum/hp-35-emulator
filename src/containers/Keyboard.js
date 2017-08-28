import React from 'react'
import PropTypes from 'prop-types'

import store from '../store'
import execute from '../alu/operations/executor'
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
          <Key className="col s3" label="𝓍ʸ" keyPress={this.keyPress('pow')} />
          <Key className="col s3" label="LOG" keyPress={this.keyPress('log')} />
          <Key className="col s3" label="LN" keyPress={this.keyPress('ln')} />
          <Key className="col s3" label="𝑒ˣ" keyPress={this.keyPress('exp')} />
          <Key className="col s3" label="CLR" keyPress={this.keyPress('clr')} />
        </div>
        <div className="row">
          <Key className="col s3" label="√𝑥" keyPress={this.keyPress('pow')} />
          <Key className="col s3" label="ARC" keyPress={this.keyPress('arc')} />
          <Key className="col s3" label="SIN" keyPress={this.keyPress('sin')} />
          <Key className="col s3" label="COS" keyPress={this.keyPress('cos')} />
          <Key className="col s3" label="TAN" keyPress={this.keyPress('tan')} />
        </div>
        <div className="row">
          <Key className="col s3" label="¹/𝓍" keyPress={this.keyPress('reciproc')} />
          <Key className="col s3" label="𝑥⬄𝑦" keyPress={this.keyPress('swapXY')} />
          <Key className="col s3" label="R↓" keyPress={this.keyPress('rollDown')} />
          <Key className="col s3" label="STO" keyPress={this.keyPress('sto')} />
          <Key className="col s3" label="RCL" keyPress={this.keyPress('rcl')} />
        </div>
        <div className="row">
          <Key className="col s3" label="Enter ↑" keyPress={this.keyPress('enter')} />
          <Key className="col s3" label="CHS" keyPress={this.keyPress('chs')} />
          <Key className="col s3" label="EEX" keyPress={this.keyPress('eex')} />
          <Key className="col s3" label="CL𝓧" keyPress={this.keyPress('clx')} />
        </div>
        <div className="row">
          <Key className="col s3" label="-" keyPress={this.keyPress('sub')} />
          <Key className="col s3" label="7" keyPress={this.keyPress('digit7')} />
          <Key className="col s3" label="8" keyPress={this.keyPress('digit8')} />
          <Key className="col s3" label="9" keyPress={this.keyPress('digit9')} />
        </div>
        <div className="row">
          <Key className="col s3" label="+" keyPress={this.keyPress('add')} />
          <Key className="col s3" label="4" keyPress={this.keyPress('digit4')} />
          <Key className="col s3" label="5" keyPress={this.keyPress('digit5')} />
          <Key className="col s3" label="6" keyPress={this.keyPress('digit6')} />
        </div>
        <div className="row">
          <Key className="col s3" label="×" keyPress={this.keyPress('mul')} />
          <Key className="col s3" label="1" keyPress={this.keyPress('digit1')} />
          <Key className="col s3" label="2" keyPress={this.keyPress('digit2')} />
          <Key className="col s3" label="3" keyPress={this.keyPress('digit3')} />
        </div>
        <div className="row">
          <Key className="col s3" label="÷" keyPress={this.keyPress('div')} />
          <Key className="col s3" label="0" keyPress={this.keyPress('digit0')} />
          <Key className="col s3" label="•" keyPress={this.keyPress('decimal')} />
          <Key className="col s3" label="π" keyPress={this.keyPress('pi')} />
        </div>
      </div>
    )
  }
}
