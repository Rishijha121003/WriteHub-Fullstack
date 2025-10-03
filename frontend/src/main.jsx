import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'; // 1. Import karo

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. App ko wrap kar do */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)