import React from 'react';
import JSRounting from './JsRounting';
import ReactDOM from 'react-dom/client';
import './css/Color.css';
import './css/App.css';
import { getSessionToken } from './componets/tools/CookiesComp';
import { LoginWindow } from './componets/tools/AuthComp';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const token = getSessionToken(); // Get the token value

root.render(
  <React.StrictMode>
    {/* Check if the token exists */}
    {token === null ? (
      <LoginWindow /> // If token doesn't exist, render the login window
    ) : (
      <JSRounting /> // If token exists, proceed with routing
    )}
  </React.StrictMode>
);
