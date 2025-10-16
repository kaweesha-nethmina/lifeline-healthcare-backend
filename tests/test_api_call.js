// Script to test the API call directly
const https = require('https');

// You'll need to replace this with a valid token from a successful login
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IkRyLiBTbWl0aCIsImVtYWlsIjoiZHJzbWl0aEBleGFtcGxlLmNvbSIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE3NjA0NzQ4MzgsImV4cCI6MTc2MDQ3ODQzOH0.YA17J1J5X5J5X5J5X5J5X5J5X5J5X5J5X5J5X5J5X5J'; // Replace with actual token

const data = JSON.stringify({
  diagnosis: 'Test diagnosis',
  treatment_plan: 'Test treatment plan',
  prescriptions: 'Test prescriptions'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/doctors/patients/2/medical-records',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  console.log(`Status: ${res.statusCode}`);
  
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.write(data);
req.end();