// Import the Express application instance from the app module
const app = require('./app');

// Define the port number for the server
// Use the PORT environment variable if available; otherwise, default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Log a message to the console indicating that the server is running
    console.log(`Server is running on http://localhost:${PORT}`);
});
