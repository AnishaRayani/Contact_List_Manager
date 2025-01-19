// Import render and screen utilities from the React Testing Library
// These utilities help in rendering components and querying the DOM for testing
import { render, screen } from '@testing-library/react';

// Import the main App component to test its functionality
import App from './App';

// Define a test case to verify that the "learn react" link is rendered
test('renders learn react link', () => {
  // Render the App component in a virtual DOM environment for testing
  render(<App />);
  
  // Search for an element containing the text "learn react" (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);

  // Assert that the element is present in the document
  expect(linkElement).toBeInTheDocument();
});
