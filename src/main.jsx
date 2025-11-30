import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CartProvider } from './context/CartContext'
import './index.css' // <-- ensure this import exists

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
)
