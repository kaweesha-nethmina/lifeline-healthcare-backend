const jwt = require('jsonwebtoken');

console.log('JWT_SECRET from environment in middleware:', process.env.JWT_SECRET);

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Verifying token with secret:', process.env.JWT_SECRET ? '***REDACTED***' : 'undefined');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Token verification error:', err.message);
    return res.status(401).json({ error: 'Invalid Token' });
  }
};

module.exports = jwtMiddleware;