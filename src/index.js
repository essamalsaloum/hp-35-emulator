import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'font-awesome/css/font-awesome.css'
import Root from './Root'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
