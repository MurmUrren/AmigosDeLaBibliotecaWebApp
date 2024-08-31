import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './app/App.jsx';
import './app/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter basename="/AmigosDeLaBibliotecaWebApp">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>,
);
