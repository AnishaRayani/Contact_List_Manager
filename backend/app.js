// Import required modules
const express = require('express'); // Express framework for building the server
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const dotenv = require('dotenv'); // Module for loading environment variables from a .env file
const contactRoutes = require('./routes/contactRoutes'); // Import routes for managing contacts

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware setup

// Use body-parser middleware to parse JSON data from incoming requests
app.use(bodyParser.json());

// Use contactRoutes for all routes starting with '/api/contacts'
// This delegates the handling of these routes to the contactRoutes module
app.use('/api/contacts', contactRoutes);

// Global error-handling middleware
// Catches errors thrown in the application and sends a JSON response with the error message
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message }); // Set status code and return error message
});

// Export the app object for use in the main server file
module.exports = app;
