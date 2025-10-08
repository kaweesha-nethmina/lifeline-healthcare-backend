// Test JSON parsing
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to test JSON parsing
app.use(bodyParser.json());

app.post('/test-json', (req, res) => {
  console.log('Received body:', req.body);
  res.json({ received: req.body });
});

app.listen(5001, () => {
  console.log('Test server running on port 5001');
});