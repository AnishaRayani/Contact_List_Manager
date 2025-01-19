// Import the Express module to create a router for handling HTTP requests
const express = require('express');

// Create an Express Router instance to define API routes
const router = express.Router();

// Import controller functions to handle requests for contacts
const {
    addContact,       // Handles adding a new contact
    getContacts,      // Handles retrieving all contacts
    searchContacts,   // Handles searching for contacts by name or email
    deleteContact     // Handles deleting a contact by ID
} = require('../controllers/contactController');

// Define the API routes and associate them with controller functions

// Route to add a new contact
// HTTP Method: POST
// URL: /
// Body: { name: <string>, email: <string> }
router.post('/', addContact);

// Route to retrieve all contacts
// HTTP Method: GET
// URL: /
router.get('/', getContacts);

// Route to search for contacts by name or email
// HTTP Method: GET
// URL: /search
// Query Parameters: { q: <string> }
router.get('/search', searchContacts);

// Route to delete a contact by ID
// HTTP Method: DELETE
// URL: /:id
// Parameters: { id: <number> }
router.delete('/:id', deleteContact);

// Export the router to be used in the main application
module.exports = router;
