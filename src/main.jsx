import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HoodProvider } from './context/HoodContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HoodProvider>
      <App />
    </HoodProvider>
  </React.StrictMode>,
)