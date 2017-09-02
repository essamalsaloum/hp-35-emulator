import React from 'react'
import PropTypes from 'prop-types'

import './Key.css'

export default function Key(props) {
  const { label, width = 40, onClick } = props
  return (
    <button
      type="button"
      className="Key"
      style={{width}}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Key.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  width: PropTypes.number,
  onClick: PropTypes.func
}

const noop = () => undefined

Key.defaultProps = {
  onClick: noop
}