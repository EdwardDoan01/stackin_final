import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ backgroundColor: '#E9F0F6', minHeight: '100vh' }}>
      <App />
    </div>
  </StrictMode>,
)
