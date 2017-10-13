import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'
import { grey700 } from 'material-ui/styles/colors'
import AlertDialog from './AlertDialog'

const noop = () => undefined

export default class MemoryToolbar extends React.PureComponent {

  static propTypes = {
    onBackClick: PropTypes.func,
    onClearAllClick: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    onBackClick: noop,
    onClearAllClick: noop,
    disabled: true,
  }

  state = {
    openAlert: false
  }

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(ok) {
    this.setState({ openAlert: false })
    if (ok) {
      this.props.onClearAllClick()
    }
  }

  render() {
    const { onBackClick, disabled } = this.props
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <IconButton onClick={onBackClick} >
            <ArrowBack color={grey700} />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton label="Clear All" onClick={() => this.setState({ openAlert: true })} disabled={disabled} />
          <AlertDialog open={this.state.openAlert} prompt="Clear All?" handleClose={this.handleClose} />
        </ToolbarGroup>
      </Toolbar >
    )
  }
}
