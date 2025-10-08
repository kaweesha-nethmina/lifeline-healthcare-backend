// Script to decode a JWT token
const jwt = require('jsonwebtoken');

// Use the JWT secret from the environment
const jwtSecret = process.env.JWT_SECRET || 'gww+VTVxjai5ZNlBeMyovsLfuDqEYogTn3aNMiIRgcyxAp3HkvA+lYaiqt171se1VwfWYaFRu2jUceioxxYNgg==';

// You would need to paste the actual token here from Postman
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IkRyLiBTbWl0aCIsImVtYWlsIjoiZHJzbWl0aEBleGFtcGxlLmNvbSIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE3NjA0NzQ4MzgsImV4cCI6MTc2MDQ3ODQzOH0.YA17J1J5X5J5X5J5X5J5X5J5X5J5X5J5X5J5X5J5X5J'; // Replace with actual token

try {
  const decoded = jwt.verify(token, jwtSecret);
  console.log('Decoded token:', decoded);
  console.log('User ID from token:', decoded.id);
} catch (err) {
  console.log('Token verification error:', err.message);
}