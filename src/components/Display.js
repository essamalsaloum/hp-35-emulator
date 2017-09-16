import React from 'react'
import PropTypes from 'prop-types'
import theme from '../theme'
import './Display.css'

const labels = ['x', 'y', 'z', 't']
const annunciators = ['', 'f', 'g']

const annunciatorStyles = [
  {},
  {color: theme.topLabelColor},
  {color: theme.bottomLabelColor}
]

function renderStack(stack, buffer) {
  return stack.map((register, index) => {
    const value = index === 0 ? buffer : register.toString()
    return (
      <div className="Display_row" key={index}>{`${labels[index]}: ${value}`}</div>
    )
  }).reverse()
}

export default function Display({ stack = [], buffer = '', shift = 0 }) {
  return (
    <div className="Display">
      <div className="Display_annunciator" style={annunciatorStyles[shift]}>{annunciators[shift]}</div>
      {renderStack(stack, buffer)}
    </div>
  )
}

Display.propTypes = {
  stack: PropTypes.array,
  buffer: PropTypes.string,
  shift: PropTypes.number
}

