import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the import from 'react-dom/client'
import App from 'components/App';
import { ImageProvider } from 'components/Context/Context';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root
root.render(
  <ImageProvider>
    <App />
  </ImageProvider>
);
