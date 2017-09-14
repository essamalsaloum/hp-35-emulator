import React from 'react'
import PropTypes from 'prop-types'
import './Display.css'

const labels = ['x', 'y', 'z', 't']

function renderStack(stack, buffer) {
  return stack.map((register, index) => {
    const value = index === 0 ? buffer : register.toString()
    return (
      <div className="Display--row" key={index}>{`${labels[index]}: ${value}`}</div>
    )
  }).reverse()
}

export default function Display({ stack = [], buffer = '' }) {
  return (
    <div className="Display">
      {renderStack(stack, buffer)}
    </div>
  )
}

Display.propTypes = {
  stack: PropTypes.array,
  buffer: PropTypes.string
}

