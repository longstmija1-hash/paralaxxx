import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#12121e',
                color: '#e0e0ff',
                border: '1px solid rgba(0,255,135,0.2)',
                fontFamily: 'Inter, sans-serif',
              },
              success: { iconTheme: { primary: '#00ff87', secondary: '#050508' } },
              error: { iconTheme: { primary: '#ff453a', secondary: '#050508' } },
            }}
          />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
