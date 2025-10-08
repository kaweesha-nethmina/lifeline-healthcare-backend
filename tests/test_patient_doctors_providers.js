// Test script for patient endpoints with existing data
// This script assumes you have a valid JWT token

const testWithToken = async (token) => {
  try {
    // Test get all doctors endpoint
    console.log('Testing get all doctors endpoint...');
    const doctorsResponse = await fetch('http://localhost:5000/patients/doctors', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const doctorsData = await doctorsResponse.json();
    console.log('Doctors response status:', doctorsResponse.status);
    console.log('Doctors count:', doctorsData.length || 0);
    console.log('Doctors data sample:', doctorsData.length > 0 ? doctorsData[0] : 'No data');

    // Test get all insurance providers endpoint
    console.log('\nTesting get all insurance providers endpoint...');
    const insuranceProvidersResponse = await fetch('http://localhost:5000/patients/insurance-providers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const insuranceProvidersData = await insuranceProvidersResponse.json();
    console.log('Insurance providers response status:', insuranceProvidersResponse.status);
    console.log('Insurance providers count:', insuranceProvidersData.length || 0);
    console.log('Insurance providers data sample:', insuranceProvidersData.length > 0 ? insuranceProvidersData[0] : 'No data');
    
  } catch (error) {
    console.error('Error:', error);
  }
};

// Replace 'YOUR_JWT_TOKEN_HERE' with a valid JWT token
const jwtToken = 'YOUR_JWT_TOKEN_HERE';
if (jwtToken !== 'YOUR_JWT_TOKEN_HERE') {
  testWithToken(jwtToken);
} else {
  console.log('Please replace YOUR_JWT_TOKEN_HERE with a valid JWT token');
}