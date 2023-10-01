// Helper function to check if a token exists in local storage
export function isTokenValid() {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if the token exists, false otherwise
}

// Example of using the isTokenValid function to protect a route
if (isTokenValid()) {
  // Allow access to the protected route
  console.log('Token is valid. You can access this route.');
} else {
  // Redirect or show an error message because the token is not valid
  console.log('Token is not valid. You cannot access this route.');
}