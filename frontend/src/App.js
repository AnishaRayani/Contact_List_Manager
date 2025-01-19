// Import the React library to create and manage React components
import React from 'react';

// Import the ContactPage component, which handles contact-related functionality
import ContactPage from './ContactPage';

// Import the CSS styles for the application
import './styles.css';

// Define the main App component
function App() {
    return (
        // Render the application's root container
        <div>
            {/* Include the ContactPage component, which is the main feature of the app */}
            <ContactPage />
        </div>
    );
}

// Export the App component to be used as the entry point for the React application
export default App;
