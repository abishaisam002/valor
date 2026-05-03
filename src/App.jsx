import React from 'react'
import Home from './pages/Home'
import { WPProvider } from './context/WPContext'

function App() {
  return (
    <WPProvider>
      <Home />
    </WPProvider>
  )
}

export default App
