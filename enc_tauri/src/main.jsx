import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { HeroUIProvider } from '@heroui/react'
// import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@/components/theme-provider"


export default App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
