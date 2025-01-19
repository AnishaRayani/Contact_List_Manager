// Import React, the core library for building React applications
import React from 'react';

// Import StrictMode to highlight potential problems in the application during development
import { StrictMode } from 'react';

// Import the createRoot function from the React DOM package to render the app
import { createRoot } from 'react-dom/client';

// Import the main App component, which serves as the root component of the application
import App from './App';

// Select the root DOM element where the React app will be mounted
const rootElement = document.getElementById('root');

// Create a root container for the React application using the selected DOM element
const root = createRoot(rootElement);

// Render the application inside the root container
root.render(
    <StrictMode>
        {/* The StrictMode component wraps the App to enforce best practices and identify issues */}
        <App />
    </StrictMode>
);
