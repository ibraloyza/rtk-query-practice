import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '/src/main.css'; // Correct way to import CSS for side effects
import { Provider } from 'react-redux';
import { store } from './state/stores.js';
import React from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider  store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
