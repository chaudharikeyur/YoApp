import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider } from "@chakra-ui/react";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from './Context/ChatProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ChatProvider>
<ChakraProvider>
    <App />
    </ChakraProvider>
    </ChatProvider>
    </BrowserRouter>
  </StrictMode>,
)
