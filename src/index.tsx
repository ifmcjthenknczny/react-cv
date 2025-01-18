import './index.scss'

import Cv from './Cv'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Cv />
    </React.StrictMode>
)

