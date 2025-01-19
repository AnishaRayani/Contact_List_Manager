// Import the database model for handling contacts
const db = require('../models/contactModel');

/**
 * Add a new contact to the database.
 * Validates the input and checks for duplicate emails before inserting.
 */
exports.addContact = async (req, res, next) => {
    const { name, email } = req.body;

    // Validate that name and email are provided
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
        // Check if the email already exists in the database
        const checkQuery = `SELECT * FROM contacts WHERE email = ?`;
        const existingContact = await db.allAsync(checkQuery, [email]);

        if (existingContact.length > 0) {
            return res.status(409).json({ error: 'A contact with this email already exists.' });
        }

        // Insert the new contact into the database
        const query = `INSERT INTO contacts (name, email) VALUES (?, ?)`;
        const result = await db.runAsync(query, [name, email]);

        // Respond with the newly created contact's ID, name, and email
        res.status(201).json({ id: result.lastID, name, email });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

/**
 * Retrieve all contacts from the database.
 */
exports.getContacts = async (req, res, next) => {
    try {
        // Query to fetch all contacts
        const query = `SELECT * FROM contacts`;
        const contacts = await db.allAsync(query);

        // Respond with the list of contacts
        res.json(contacts);
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

/**
 * Search contacts by name or email.
 * Supports partial matches using SQL LIKE operator.
 */
exports.searchContacts = async (req, res, next) => {
    const { q } = req.query; // Extract the search query parameter
    try {
        // Query to search for contacts matching the query in name or email
        const query = `SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ?`;
        const contacts = await db.allAsync(query, [`%${q}%`, `%${q}%`]);

        // Respond with the list of matching contacts
        res.json(contacts);
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

/**
 * Delete a contact by ID.
 */
exports.deleteContact = async (req, res, next) => {
    const { id } = req.params; // Extract the contact ID from request parameters
    try {
        // Query to delete the contact with the specified ID
        const query = `DELETE FROM contacts WHERE id = ?`;
        await db.runAsync(query, [id]);

        // Respond with a success message
        res.json({ message: `Contact with ID ${id} deleted.` });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};
