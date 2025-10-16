// Test script for admin user management endpoints
// This script assumes you have a valid admin token

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:5000/api';
const ADMIN_TOKEN = 'YOUR_ADMIN_TOKEN_HERE'; // Replace with actual admin token

// Headers for authenticated requests
const headers = {
  'Authorization': `Bearer ${ADMIN_TOKEN}`,
  'Content-Type': 'application/json'
};

// Test data for creating a user
const testUser = {
  email: 'testuser@example.com',
  name: 'Test User',
  role: 'patient',
  password: 'testpassword123'
};

// Test data for updating a user
const updateData = {
  name: 'Updated Test User',
  phone_number: '+1234567890',
  date_of_birth: '1990-01-01',
  gender: 'Male',
  address: '123 Test Street, Test City',
  emergency_contact: 'Emergency Contact: +1234567890'
};

async function testAdminEndpoints() {
  try {
    console.log('Testing Admin User Management Endpoints...\n');

    // 1. Create a test user first
    console.log('1. Creating test user...');
    const createUserResponse = await axios.post(
      `${BASE_URL}/admin/create-user`,
      testUser,
      { headers }
    );
    console.log('Create user response:', createUserResponse.data);
    
    const userId = createUserResponse.data.user.id;
    console.log(`Created user with ID: ${userId}\n`);

    // 2. Get all users to verify the new user exists
    console.log('2. Getting all users...');
    const getAllUsersResponse = await axios.get(
      `${BASE_URL}/admin/users`,
      { headers }
    );
    console.log(`Total users: ${getAllUsersResponse.data.length}\n`);

    // 3. Update the user
    console.log('3. Updating user...');
    const updateUserResponse = await axios.put(
      `${BASE_URL}/admin/users/${userId}`,
      updateData,
      { headers }
    );
    console.log('Update user response:', updateUserResponse.data);

    // 4. Get all users again to verify the update
    console.log('4. Getting all users after update...');
    const getAllUsersAfterUpdateResponse = await axios.get(
      `${BASE_URL}/admin/users`,
      { headers }
    );
    
    // Find the updated user
    const updatedUser = getAllUsersAfterUpdateResponse.data.find(user => user.id === userId);
    console.log('Updated user data:', updatedUser);
    
    // Verify the update
    if (updatedUser && updatedUser.name === updateData.name) {
      console.log('✓ User update verified successfully\n');
    } else {
      console.log('✗ User update verification failed\n');
    }

    // 5. Delete the user
    console.log('5. Deleting user...');
    const deleteUserResponse = await axios.delete(
      `${BASE_URL}/admin/users/${userId}`,
      { headers }
    );
    console.log('Delete user response:', deleteUserResponse.data);

    // 6. Get all users again to verify the deletion
    console.log('6. Getting all users after deletion...');
    const getAllUsersAfterDeleteResponse = await axios.get(
      `${BASE_URL}/admin/users`,
      { headers }
    );
    
    // Check if the user still exists
    const deletedUser = getAllUsersAfterDeleteResponse.data.find(user => user.id === userId);
    if (!deletedUser) {
      console.log('✓ User deletion verified successfully\n');
    } else {
      console.log('✗ User deletion verification failed\n');
    }

    console.log('All tests completed successfully!');
    
  } catch (error) {
    console.error('Error during testing:', error.response ? error.response.data : error.message);
  }
}

// Run the tests
testAdminEndpoints();