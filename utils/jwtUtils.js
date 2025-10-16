const jwt = require('jsonwebtoken');

console.log('JWT_SECRET from environment:', process.env.JWT_SECRET);

const generateToken = (payload) => {
  console.log('Generating token with secret:', process.env.JWT_SECRET ? '***REDACTED***' : 'undefined');
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  console.log('Verifying token with secret:', process.env.JWT_SECRET ? '***REDACTED***' : 'undefined');
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};