// Import necessary modules and components
import React, { useState, useEffect } from 'react'; // React for component creation, useState for state management, useEffect for lifecycle management
import axios from 'axios'; // Axios for making HTTP requests
import './styles.css'; // Import external CSS for styling

// Define the ContactPage component
function ContactPage() {
    // State variables for managing contacts, form inputs, search input, and status
    const [contacts, setContacts] = useState([]); // List of contacts
    const [name, setName] = useState(''); // Name input field
    const [email, setEmail] = useState(''); // Email input field
    const [search, setSearch] = useState(''); // Search input field
    const [status, setStatus] = useState(''); // Status for displaying messages

    // Fetch contacts when the component is mounted
    useEffect(() => {
        fetchContacts(); // Fetch the initial list of contacts
    }, []); // Empty dependency array ensures this runs only once

    // Fetch all contacts from the backend
    const fetchContacts = async () => {
        try {
            const response = await axios.get('/api/contacts'); // GET request to fetch contacts
            setContacts(response.data); // Update state with fetched contacts
        } catch (error) {
            console.error('Error fetching contacts:', error); // Log errors if the request fails
        }
    };

    // Handle adding a new contact
    const handleAddContact = async () => {
        // Validate inputs
        if (!name || !email) {
            alert('Both name and email are required!');
            return;
        }

        try {
            // POST request to add a new contact
            const response = await axios.post('/api/contacts', { name, email });
            setContacts([...contacts, response.data]); // Update state with the new contact
            setName(''); // Reset name field
            setEmail(''); // Reset email field
            setStatus('Add'); // Set status to 'Add' to display success message
        } catch (error) {
            // Handle duplicate email error
            if (error.response && error.response.status === 409) {
                alert('A contact with this email already exists!');
            } else {
                alert('Failed to add contact.');
            }
        }
    };

    // Handle searching contacts
    const handleSearch = async () => {
        try {
            // GET request to search for contacts by name or email
            const response = await axios.get(`/api/contacts/search?q=${search}`);
            setContacts(response.data); // Update state with search results

            // Update status based on the response
            if (response.status === 200) {
                setStatus('Yes');
                if (response.data.length === 0) {
                    setStatus('No'); // No results found
                }
            } else {
                setStatus('No');
            }
        } catch (error) {
            console.error('Error searching contacts:', error);
            setStatus('No'); // Set status to 'No' if an error occurs
        }
    };

    // Handle deleting a contact
    const handleDelete = async (id) => {
        try {
            // DELETE request to remove a contact by ID
            await axios.delete(`/api/contacts/${id}`);
            setContacts(contacts.filter((contact) => contact.id !== id)); // Remove the deleted contact from state
        } catch (error) {
            console.error('Error deleting contact:', error); // Log errors if the request fails
        }
    };

    return (
        <div>
            <h1>Contact List Manager</h1>
            {/* Form to add a new contact */}
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update name state
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                />
                <button onClick={handleAddContact}>Add Contact</button>
            </div>

            {/* Form to search contacts */}
            <div>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (e.target.value === '') setStatus(''); // Reset status if search input is cleared
                    }}
                />
                <button onClick={(e) => handleSearch(e)}>Search</button>
            </div>

            {/* Display contacts or status messages */}
            <div>
                {status === 'Yes' ? (
                    <ul>
                        {contacts.map((contact) => (
                            <li key={contact.id}>
                                {contact.name} - {contact.email}
                                <button onClick={() => handleDelete(contact.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : status === 'Add' ? (
                    <h1>Contact Added Successfully!!!</h1>
                ) : status === 'No' ? (
                    <h1>Oops, No contact details found!</h1>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

// Export the ContactPage component for use in other parts of the application
export default ContactPage;
