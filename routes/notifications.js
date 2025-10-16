const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const supabase = require('../db');

// Middleware to check if Supabase is configured
router.use((req, res, next) => {
  if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === 'your_supabase_url') {
    return res.status(500).json({ 
      error: 'Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY in .env file.' 
    });
  }
  next();
});

// Notification routes
router.get('/', notificationController.getUserNotifications);
router.post('/', notificationController.createNotification);
router.put('/:id/status', notificationController.updateNotificationStatus);
router.put('/:id/read', notificationController.markAsRead);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;