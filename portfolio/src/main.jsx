import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ABTestProvider } from './contexts/ABTestContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ABTestProvider>
      <App />
    </ABTestProvider>
  </StrictMode>,
)
