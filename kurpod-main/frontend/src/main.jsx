import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './components/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </ThemeProvider>
  </StrictMode>,
)