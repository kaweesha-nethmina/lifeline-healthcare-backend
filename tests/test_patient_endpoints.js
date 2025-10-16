// Test script for new patient endpoints
const testPatientEndpoints = async () => {
  try {
    // First, register a test patient
    console.log('Registering test patient...');
    const registerResponse = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'patient_test@example.com',
        name: 'Test Patient',
        role: 'patient',
        password: 'password123'
      })
    });

    const registerData = await registerResponse.json();
    console.log('Register response status:', registerResponse.status);
    console.log('Register response data:', registerData);

    // Login to get JWT token
    console.log('\nLogging in...');
    const loginResponse = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'patient_test@example.com',
        password: 'password123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response status:', loginResponse.status);
    console.log('Login response data:', loginData);

    if (loginData.token) {
      // Test get all doctors endpoint
      console.log('\nTesting get all doctors endpoint...');
      const doctorsResponse = await fetch('http://localhost:5000/patients/doctors', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        }
      });

      const doctorsData = await doctorsResponse.json();
      console.log('Doctors response status:', doctorsResponse.status);
      console.log('Doctors response data:', doctorsData);

      // Test get all insurance providers endpoint
      console.log('\nTesting get all insurance providers endpoint...');
      const insuranceProvidersResponse = await fetch('http://localhost:5000/patients/insurance-providers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        }
      });

      const insuranceProvidersData = await insuranceProvidersResponse.json();
      console.log('Insurance providers response status:', insuranceProvidersResponse.status);
      console.log('Insurance providers response data:', insuranceProvidersData);
    } else {
      console.log('Login failed, cannot test protected endpoints');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

testPatientEndpoints();