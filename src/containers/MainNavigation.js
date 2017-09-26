import React from 'react'
import PropTypes from 'prop-types'
import FontIcon from 'material-ui/FontIcon'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import { blueGrey50 as backgroundColor } from 'material-ui/styles/colors'

const keypadIcon = <FontIcon className="fa fa-calculator" style={{opacity: 0.7}}/>
const constantsIcon = <FontIcon className="fa fa-flask" style={{opacity: 0.7}}/>
const helpIcon = <FontIcon className="fa fa-info-circle" style={{opacity: 0.7}}/>

export default class MainNavigation extends React.PureComponent {

  state = {
    selectedIndex: 0
  }

  static propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation style={{ backgroundColor }} selectedIndex={this.props.selectedIndex}>
          <BottomNavigationItem
            icon={keypadIcon}
            onClick={() => this.props.onSelect(0)}
          />
          <BottomNavigationItem
            icon={constantsIcon}
            onClick={() => this.props.onSelect(1)}
          />
          <BottomNavigationItem
            icon={helpIcon}
            onClick={() => undefined}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}
