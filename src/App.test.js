import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement(C.DIV)
  ReactDOM.render(<App />, div)
})
