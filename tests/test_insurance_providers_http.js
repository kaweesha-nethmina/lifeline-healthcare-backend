// Script to test the insurance providers endpoint using HTTP
const http = require('http');

// Use a valid token from a doctor or admin user
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoidGFzaGltd2VlcmFzaW5naGVAZ21haWwuY29tIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTc2MDQ3MDM2MCwiZXhwIjoxNzYwNDczOTYwfQ.3gb6Oc5HLkcLau5oqV4bmnAKlNXKlVfHk3pJUinDPkY';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/insurance/providers',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = http.request(options, res => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.end();