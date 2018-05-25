import registerServiceWorker from './registerServiceWorker'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './App'

import './index.css'
import 'typeface-asap'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
