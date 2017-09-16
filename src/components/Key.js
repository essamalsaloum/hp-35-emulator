import React from 'react'
import PropTypes from 'prop-types'
import theme from '../theme'
import './Key.css'

const noop = () => undefined

const topLabelStyle = {
  height: 14,
  fontSize: 12,
  fontWeight: 'bold',
  lineHeight: '1em',
  color: theme.topLabelColor,
  textAlign: 'center',
  marginBottom: 6
}

const bottomLabelStyle = {
  fontSize: 11,
  lineHeight: '1em',
  color: theme.bottomLabelColor
}

const createMarkup = label => ({ __html: label })

export default function Key(props) {
  const { label, topLabel = '', bottomLabel = '', width = 40, onClick = noop, style = [] } = props


  return (
    <div>
      <div style={topLabelStyle} dangerouslySetInnerHTML={createMarkup(topLabel)}></div>
      <button
        type="button"
        className="Key"
        style={{ ...style, width }}
        onClick={onClick}
        onKeyUp={ev => ev.preventDefault()}
        onKeyDown={ev => ev.preventDefault()}
      >
        <div dangerouslySetInnerHTML={createMarkup(label)}></div>
        <div style={bottomLabelStyle} dangerouslySetInnerHTML={createMarkup(bottomLabel)}></div>
      </button>
    </div>
  )
}

Key.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  topLabel: PropTypes.string,
  bottomLabel: PropTypes.string,
  width: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object
}
