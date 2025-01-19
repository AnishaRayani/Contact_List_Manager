# Contact List Manager

## Description
The Contact List Manager is a simple web application designed to manage contacts. It allows users to add, search, and delete contacts. The application demonstrates clean code practices, backend/frontend integration, and efficient handling of data with SQLite.

---

## Features
- Add new contacts with a name and email.
- Search for contacts by name or email.
- Delete contacts from the list.
- Error handling for duplicate entries and invalid inputs.

---

## Setup and Run Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/). Ensure you are using Node.js v16 or higher.
2. Install [npm](https://www.npmjs.com/) (comes with Node.js).

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
4. Verify the server is running by visiting:
   ```
   http://localhost:5000/api/contacts
   ```
   You should see an empty array (`[]`) if the backend is working correctly.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Approach

### Backend Design
- **Node.js with Express**: A lightweight framework to build a RESTful API.
- **SQLite**: A simple and lightweight database to store contact information.
- **Error Handling**: Comprehensive error handling to ensure the server gracefully handles invalid inputs and duplicate data.
- **Data Validation**: Validates that name and email are provided, and ensures email uniqueness before adding to the database.

### Frontend Design
- **React**: A component-based framework for building a dynamic and interactive UI.
- **Axios**: For handling HTTP requests to the backend API.
- **Real-Time Updates**: The contact list updates dynamically when new contacts are added, searched, or deleted.
- **Search and Error Feedback**: Users receive immediate feedback for duplicate emails and can search for contacts seamlessly.

### Trade-offs
- **SQLite vs Other Databases**: SQLite is lightweight and sufficient for this small-scale application. However, for scalability, a database like PostgreSQL or MongoDB would be more appropriate.
- **Error Handling**: Focused on functional errors like duplicate emails and invalid inputs. Advanced error logging to external systems is not implemented.
- **Styling**: Basic CSS styling is used. For a production app, libraries like Bootstrap or Material-UI could enhance the UI.

### Design Decisions
1. **Simple Architecture**: Divided into frontend and backend for modularity.
2. **Proxy Setup**: A proxy in `frontend/package.json` simplifies API calls without needing absolute URLs.
3. **Async/Await**: Used in the backend for better readability and handling of asynchronous operations.

---

## Testing
### Backend Testing
- Use Postman or cURL to test API endpoints:
  - Add Contact (`POST /api/contacts`)
  - Get Contacts (`GET /api/contacts`)
  - Search Contacts (`GET /api/contacts/search?q=<query>`)
  - Delete Contact (`DELETE /api/contacts/:id`)

### Frontend Testing
1. Open the app at `http://localhost:3000`.
2. Test:
   - Adding a contact.
   - Searching for a contact.
   - Deleting a contact.

---

## Possible Improvements
1. **User Authentication**: Add user accounts to make the contact list private per user.
2. **Pagination**: Implement pagination for large contact lists.
3. **Better Error Feedback**: Show inline error messages on the frontend for invalid inputs or duplicate emails.
4. **Deployment**: Host the app using platforms like Vercel (frontend) and Render (backend).

---

## Author
**Anisha Arifali Rayani**
