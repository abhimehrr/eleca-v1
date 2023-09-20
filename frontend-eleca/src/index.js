import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './css/main.css'

// Contexts
import { UserContextProvider } from './context/UserContext'
import { AdminContextProvider } from './context/AdminContext'

const root = ReactDOM.createRoot(document.getElementById('eleca-app'));
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AdminContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
