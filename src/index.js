import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App
  percentWidthGrid={72}
  columns={12}
  rows={9} />, document.getElementById('root'))

registerServiceWorker()
