import React from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
import { ChatProvider } from './context/ChatContext.jsx'

export const server = "https://chatbot-backend-cme7.onrender.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </UserProvider>
  </React.StrictMode>,
)
