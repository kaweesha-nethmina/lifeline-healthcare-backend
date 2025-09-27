const express = require('express');
const router = express.Router();
const systemAdminController = require('../controllers/systemAdminController');
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

// System maintenance and security management
router.post('/system-maintenance', systemAdminController.performSystemMaintenance);

// Monitor system logs
router.get('/logs', systemAdminController.getSystemLogs);

// Create system backup
router.post('/backup', systemAdminController.createSystemBackup);

module.exports = router;