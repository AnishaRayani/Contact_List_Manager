/**
 * Function to measure and report web vitals performance metrics.
 * Web vitals help in understanding the performance of a web page and user experience.
 * @param {Function} onPerfEntry - Callback function to handle performance metrics.
 */
const reportWebVitals = (onPerfEntry) => {
  // Check if a callback function is provided and if it's an instance of Function
  if (onPerfEntry && onPerfEntry instanceof Function) {
      // Dynamically import the 'web-vitals' library to measure performance metrics
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          // Call the provided callback function with each performance metric
          getCLS(onPerfEntry);  // Cumulative Layout Shift
          getFID(onPerfEntry);  // First Input Delay
          getFCP(onPerfEntry);  // First Contentful Paint
          getLCP(onPerfEntry);  // Largest Contentful Paint
          getTTFB(onPerfEntry); // Time to First Byte
      });
  }
};

// Export the function as the default export for use in other modules
export default reportWebVitals;
