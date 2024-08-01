// src/services/authService.js

export const checkAuthStatus = async () => {
    try {
      // Replace the URL with the actual endpoint that returns the authentication status
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include', // Include cookies for cross-origin requests
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.isAuthenticated; // Adjust based on your API response
      }
  
      return false;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  };
  