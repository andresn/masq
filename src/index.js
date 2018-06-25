import registerServiceWorker from './registerServiceWorker'
import ReactDOM from 'react-dom'
import React from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from './i18n/i18n'
import App from './App'

import './index.css'
import 'typeface-asap'

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
)
registerServiceWorker()
