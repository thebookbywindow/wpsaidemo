import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
/* home-v2 overrides after index.css so they win over legacy !important home-* rules */
import './styles/home-v2.css'
import App from './App.jsx'

// SPA: prevent browser restoring mid-page scrollY on reload (tall sticky tracks).
if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
