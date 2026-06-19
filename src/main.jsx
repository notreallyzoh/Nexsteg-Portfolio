import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// No StrictMode: keeps the GSAP page-load choreography from double-firing in dev.
createRoot(document.getElementById('root')).render(<App />)
