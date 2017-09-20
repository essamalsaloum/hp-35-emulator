import React from 'react'
import PropTypes from 'prop-types'

export default class TabTemplate extends React.PureComponent {

  static propTypes = {
    selected: PropTypes.bool,
    children: PropTypes.object
  }

  render() {
    return this.props.selected ? this.props.children : null
  }
}


