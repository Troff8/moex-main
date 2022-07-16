import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'

const ConfiguredApp = () => (
    <HashRouter>
        <App />
    </HashRouter>
)
ReactDOM.render(<ConfiguredApp />, document.getElementById('root'))
