import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import './ProgramTextMarkdown.css'

export default class ProgramTextMarkdown extends React.PureComponent {

  mdText = ''

  componentWillMount() {
    this.mdText = marked(this.props.programText)
  }

  render() {
    return (
      <div className="ProgramTextMarkdown">
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: this.mdText }} />
      </div>
    )
  }
}

ProgramTextMarkdown.propTypes = {
  programText: PropTypes.string.isRequired,
}