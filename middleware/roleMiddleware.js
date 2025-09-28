const roleMiddleware = (roles = []) => {
  // roles param can be a single role string (e.g. 'admin') 
  // or an array of roles (e.g. ['admin', 'manager'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if user's role is included in the allowed roles
    // Admins can access all routes
    if (roles.length && !roles.includes(req.user.role) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};

module.exports = roleMiddleware;