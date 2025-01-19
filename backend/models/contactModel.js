// Import the SQLite3 module and enable verbose mode for detailed error logging
const sqlite3 = require('sqlite3').verbose();

// Import the promisify function from the util module to convert callback-based functions into Promises
const { promisify } = require('util');

// Open the database connection to 'contacts.db'
// If the database file doesn't exist, it will be created in the current directory
const db = new sqlite3.Database('./contacts.db', (err) => {
    if (err) {
        // Log an error message if the connection fails
        console.error('Error opening database:', err.message);
    } else {
        // Log a success message if the connection is successful
        console.log('Connected to the SQLite database.');
    }
});

// Create the `contacts` table if it doesn't exist
// The table includes three columns:
// - id: Auto-incrementing primary key
// - name: Text field, required
// - email: Unique text field, required
db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    );
`, (err) => {
    if (err) {
        // Log an error message if table creation fails
        console.error('Error creating table:', err.message);
    } else {
        // Log a success message if the table is ready
        console.log('Contacts table is ready.');
    }
});

// Extend the database object with Promise-based versions of common methods
// Promisify the `all` method to execute SQL queries that return multiple rows
db.allAsync = promisify(db.all).bind(db);

// Custom implementation to promisify the `run` method
// This method executes SQL queries that modify the database (INSERT, UPDATE, DELETE)
db.runAsync = function (sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                // Reject the Promise with an error if the query fails
                reject(err);
            } else {
                // Resolve the Promise with the context (e.g., the last inserted row ID)
                resolve(this);
            }
        });
    });
};

// Export the database object for use in other modules
module.exports = db;
