export const getToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return null;
      }
      return token; // Return the token if it exists
    } catch (error) {
      console.error('Error retrieving token:', error.message);
      return null;
    }
  };
  