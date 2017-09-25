import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import { blueGrey50 as backgroundColor } from 'material-ui/styles/colors'
import store from '../store'

const keypadIcon = <FontIcon className="fa fa-keyboard-o" />
const constantsIcon = <FontIcon className="fa fa-balance-scale" />
const helpIcon = <FontIcon className="fa fa-info-circle" />

const updateKeypadState = store.setSubState('keypad')

export default class MainNavigation extends React.PureComponent {
  state = {
    selectedIndex: 0,
  }

  select = (index) => this.setState({ selectedIndex: index })

  selectKeypad() {
    this.select(0)
    updateKeypadState({ mode: 'keypad' })
  }

  selectConstants() {
    this.select(1)
    updateKeypadState({ mode: 'const' })
  }

  selectHelp() {
    this.select(2)
    // updateKeypadState({mode: 'keypad'})
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation style={{ backgroundColor }} selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Keypad"
            icon={keypadIcon}
            onClick={() => this.selectKeypad()}
          />
          <BottomNavigationItem
            label="Constants"
            icon={constantsIcon}
            onClick={() => this.selectConstants()}
          />
          <BottomNavigationItem
            label="Help"
            icon={helpIcon}
            onClick={() => undefined}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}
