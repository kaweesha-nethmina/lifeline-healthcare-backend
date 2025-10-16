// Test script for protected routes
const testProtectedRoute = async () => {
  try {
    // First, login to get a token
    const loginResponse = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'kaweesha.nj@gmail.com',
        password: '123456'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (loginData.token) {
      console.log('Token received, testing protected route...');
      
      // Now test a protected route
      const protectedResponse = await fetch('http://localhost:5000/patients/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Protected route status:', protectedResponse.status);
      const protectedData = await protectedResponse.json();
      console.log('Protected route data:', protectedData);
    } else {
      console.log('No token received from login');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

testProtectedRoute();